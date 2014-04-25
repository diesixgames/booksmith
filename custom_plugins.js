var yaml = require('js-yaml');

exports.getUnitNames = function() {
  return function(files, metalsmith, done){
    var units = {};
    var i = 0;
    var str;

    for (var file in files) {
      str = file;
      str = str.match(/^units\/(.*)\.((md)|(yaml))$/);
      if (str == null) continue;

      units[i++] = str[1];
    }

    metalsmith.metadata({ units: units });
    done();
  };
};

exports.parseRef = function() {
    return function(files, metalsmith, done) {
        
        for (var file in files) {
            var str = files[file].contents.toString('utf8');
            if (str == null) continue;

            str = str.replace(/\[(|(rules)|(units))\[[^\[\]]*\]\]/g, function(match) {

                match = match.replace(/\[/, '<span class="ref" type="');
                match = match.replace(/\[/, '">');
                match = match.replace(/\]\]/, '</span>');

                return match;

            });
            
            files[file].contents = new Buffer(str);
        }

        done();
    }
}

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
