var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    collections = require('metalsmith-collections'),
    stylus = require('metalsmith-stylus'),
    watch = require('metalsmith-watch'),
    templates = require('metalsmith-templates');

var customPlugins = require('./custom_plugins');

var handle = function(err, files) {
    if (err == null) {
        console.log("Smithing succeeded.");
        return;
    }

    throw(err);
};

Metalsmith(__dirname)
    .use(customPlugins.getUnitNames())
    .use(markdown())
    .use(stylus())
    .use(templates('jade'))
    .use(customPlugins.parseUnitRef())
    .use(watch)
    .build(handle);
