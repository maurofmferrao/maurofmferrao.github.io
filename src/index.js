/**
 * DEPENDENCIES
 */

 // Functions
function requireAll(r) {
    r.keys().forEach(r);
}

// Vendor
window.jQuery = window.$ = require('jquery');

// Styles
requireAll(require.context('../styles/', true, /\.less$/));

// Scripts
requireAll(require.context('../src/', true, /\.js$/));

// Templates
requireAll(require.context('../src/', true, /\.hbs$/));