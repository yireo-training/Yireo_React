# React for Magento 2 Knockout-based frontend
The current Magento 2 frontend is based on Knockout, RequireJS and ES5 code. However, with an eye on the upcoming PWA moves, it is already possible to add React components to the Magento 2 frontend as it is. This Magento module serves as a base module, to offer a generic Webpack configuration for modules like  [Yireo_ReactMinicart](https://github.com/yireo-training/Yireo_ReactMinicart) and [Yireo_ReactMenu](https://github.com/yireo-training/Yireo_ReactMenu).

### Installation
Use the following commands to install this module into Magento 2:

    composer require yireo/magento2-react:dev-master
    bin/magento module:enable Yireo_React
    bin/magento setup:upgrade

Next, copy the files `package.json` and `webpack.config.js` to the Magento root. Next, install all of the packages:

    yarn install

Next, you can build React sources in various modules via Webpack:

    yarn dev

Alternatively, you can also copy the 2 files to another folder and use the `MAGENTO_ROOT` variable:

    MAGENTO_ROOT=/var/www/html yarn dev

### Usage
This module has no real functionality. It is only offering configuration files for other React modules.

See the [Yireo_ReactMenu](https://github.com/yireo-training/Yireo_ReactMenu) module for a dummy component.

The goal is to either create a module with a `view/frontend/react_source` folder or a theme with a `react_source` folder and
have this Webpack configuration pick up on those files to create a single bundle. Dynamic bundles (with an `import()` function
call) are also supported.

The theme is identified with a global variable:

    MAGENTO_THEME=Magento/luma yarn dev

### Experimental
This module is experimental and only meant for developers that are happy to invest time into it. It doesn't mean that it is
costing a lot of effort, it simply means that the project requires knowledge on React essentials.
