var yaml = require('js-yaml');

exports.getUnitNames = function() {
  return function(files, metalsmith, done){
    var units = {};

    for (var file in files) {
      file = file.match(/units\/(.*)\.yaml/);
      if (file == null) continue;

      units[units.length] = file[1];
    }

    metalsmith.metadata({ units: units });

    done();
  };
};

exports.parseYML = function() {
  return function(files, metalsmith, done) {
    var str, obj;

    for (var file in files) {
      if (file.match(/\.yaml$/)) {
        str = files[file].contents.toString('utf8');

        obj = yaml.safeLoad(str);
        obj.contents = obj.contents || "";

        delete files[file];
        file = file.replace(/yaml$/, "");
        files[file + "md"] = obj;
      }
    }

    done();
  }
};
