/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 3:00 PM
 */

var path = require("path")
  , glob = require("glob")
  , fs = require("fs")
  ;

exports.require = require;      //this is for testing more than anything, so require can be stubbed out

exports.getModulesFromDir = function(dir, recursive){
    recursive = recursive || false;
    var files = this.getJavaScriptFilesFromDir(dir, recursive);
    var modules = [];
    files.forEach(function(file){
        modules.push(this.require(file));
    }.bind(this));
    return modules;


}

exports.getJavaScriptFilesFromDir = function(dir, recursive){
    if(!dir) throw new Error("Parameter 'dir' is required.");
    if(!fs.existsSync(dir)) throw new Error("Directory "+dir+" does not exist.");
    if(recursive){
        dir = path.join(dir, "**", "*.js");
    } else {
        dir = path.join(dir, "*.js");
    }


    return glob.sync(dir);

}


exports.processModules = function(modules){
    var Provide = require("../node_modules/sonya").Provide;
    modules.forEach(function(aModule){
        var type = aModule.$type || "factory";

    }.bind(this))
}