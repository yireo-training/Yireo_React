const path = require('path');
const glob = require('glob');
const fs = require('fs');
const magentoRoot = process.env.MAGENTO_ROOT || __dirname; // Example: /var/www/html
const magentoTheme = process.env.MAGENTO_THEME || false; // Example: Magento/luma

if (!fs.existsSync(magentoRoot + '/app/etc/config.php')) {
    console.log('Invalid Magento root: ' + magentoRoot);
    process.exit();
}

let reactPaths = glob.sync(magentoRoot + '/vendor/*/*/view/frontend/react_source', {});
reactPaths = reactPaths.concat(glob.sync(magentoRoot + '/app/code/*/*/view/frontend/react_source', {}));
if (magentoTheme && fs.existsSync(magentoRoot + '/app/design/frontend/' + magentoTheme + '/react_source')) {
    reactPaths = reactPaths.concat(glob.sync(magentoRoot + '/app/design/frontend/' + magentoTheme + '/react_source', {}));
}

reactPaths.push(path.resolve(__dirname, 'node_modules'));

const outputFolder = path.resolve(magentoRoot + '/pub');
const generatedReactFile = path.resolve(magentoRoot + '/var/tmp/react.js');
let generatedReact = `
import React from 'react';
import ReactDOM from 'react-dom';
`;

let reactImportFiles = glob.sync(magentoRoot + '/vendor/*/*/view/frontend/react_source/_imports.js');
reactImportFiles = reactImportFiles.concat(glob.sync(magentoRoot + '/app/code/*/*/view/frontend/react_source/_imports.js', {}));
if (magentoTheme && fs.existsSync(magentoRoot + '/app/design/frontend/' + magentoTheme + '/react_source/_imports.js')) {
    reactImportFiles = reactImportFiles.concat(glob.sync(magentoRoot + '/app/design/frontend/' + magentoTheme + '/react_source/_imports.js', {}));
}

reactImportFiles.forEach(reactImportFile => {
    generatedReact += '\n// File ' + reactImportFile + '\n' + fs.readFileSync(reactImportFile);
});

let reactConfigurationFiles = glob.sync(magentoRoot + '/vendor/*/*/view/frontend/react_source/_component.js');
reactConfigurationFiles = reactConfigurationFiles.concat(glob.sync(magentoRoot + '/app/code/*/*/view/frontend/react_source/_component.js', {}));
if (magentoTheme && fs.existsSync(magentoRoot + '/app/design/frontend/' + magentoTheme + '/react_source/_component.js')) {
    reactConfigurationFiles = reactConfigurationFiles.concat(glob.sync(magentoRoot + '/app/design/frontend/' + magentoTheme + '/react_source/_component.js', {}));
}

reactConfigurationFiles.forEach(reactConfigurationFile => {
    generatedReact += '\n// File ' + reactConfigurationFile + '\n' + fs.readFileSync(reactConfigurationFile);
});

fs.writeFileSync(generatedReactFile, generatedReact);

module.exports = {
    mode: 'development',
    entry: generatedReactFile,
    resolve: {
        modules: reactPaths
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react'],
                        plugins: ['@babel/plugin-syntax-dynamic-import']
                    }
                }
            }
        ]
    },
    output: {
        path: outputFolder,
        filename: 'js/react.bundle.js'
    }
};
