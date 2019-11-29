const path = require('path');
const glob = require('glob');
const fs = require('fs');

let reactPaths = glob.sync("vendor/*/*/view/frontend/react_source", {});
reactPaths.concat(glob.sync("app/code/*/*/view/frontend/react_source", {}));
reactPaths.push(path.resolve(__dirname, 'node_modules'));

const outputFolder = path.resolve('pub');
const generatedReactFile = path.resolve('var/tmp/react.js');
let generatedReact = `
import React from "react";
import ReactDOM from "react-dom";
`;

const reactImportFiles = glob.sync("vendor/*/*/view/frontend/react_source/_imports.js");
reactImportFiles.forEach(reactImportFile => {
    generatedReact += "\n// File " + reactImportFile + "\n" + fs.readFileSync(reactImportFile);
});

const reactConfigurationFiles = glob.sync("vendor/*/*/view/frontend/react_source/_component.js");
reactConfigurationFiles.forEach(reactConfigurationFile => {
    generatedReact += "\n// File " + reactConfigurationFile + "\n" + fs.readFileSync(reactConfigurationFile);
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
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/react']
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