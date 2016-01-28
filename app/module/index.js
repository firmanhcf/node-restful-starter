module.exports = function(app,fs,path,_,mongoose){
    var dirAndFiles = fs.readdirSync(__dirname);
    var ignoreFiles = ['index.js'];
    var directory=[];

    dirAndFiles.forEach(function (file) {
        if(file.indexOf(".")==0){
            console.log(file);
            return;
        }

        if(_.include(ignoreFiles, file)){
            return;
        }

        if (!file.match(/\.js$/) ) {
              directory.push(file);
            return;
         }


        var name=path.join(__dirname, file.replace(/\.js$/, ''));
        exports[file.replace(/\.js$/, '')]=   require(name)(app, mongoose);
    });

    directory.forEach(function(folder) {
        var files = fs.readdirSync(path.join(__dirname, folder));
       
        var data={};
        files.forEach(function (file) {
            if (!file.match(/\.js$/)) {
                return;
            }
           
            data[file.replace(/\.js$/, '')]= require(path.join(__dirname, folder, file.replace(/\.js$/, '')))(app, mongoose);
        });
        exports[folder]=data;
    });

    return exports;


};