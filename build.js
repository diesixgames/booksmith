var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    collections = require('metalsmith-collections'),
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
    .use(customPlugins.parseYML())
    .use(markdown())
    .use(templates('jade'))
    .build(handle);
