# React for Magento 2 Knockout-based frontend
The current Magento 2 frontend is based on Knockout, RequireJS and ES5 modules. However, with an eye on the upcoming PWA moves, it is already possible to add React components to the Magento 2 frontend as it is. This Magento module serves as a base module, to offer generic RequireJS aliases `react` and `reactDOM` to be used in other modules like the [Yireo_ReactMinicart](https://github.com/yireo-training/Yireo_ReactMinicart)

### Installation
Use the following commands to install this module into Magento 2:

    composer config repositories.yireo-react vcs git@github.com:yireo-training/Yireo_React.git
    composer require yireo/magento2-react
    
    ./bin/magento module:enable Yireo_React
    ./bin/magento setup:upgrade

### Usage
This module has no real functionality. It is only offering RequireJS aliases for usage in other React-components.
