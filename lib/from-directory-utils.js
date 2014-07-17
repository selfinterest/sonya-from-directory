/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 3:00 PM
 */

var path = require("path")
  , glob = require("glob")
  , fs = require("fs")
  ;

exports.getModulesFromDir = function(dir, recursive){
    var files = this.getJavaScriptFilesFromDir(dir, recursive);

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