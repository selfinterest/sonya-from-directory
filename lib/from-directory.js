/**
 * Created by: Terrence C. Watson
 * Date: 7/17/14
 * Time: 2:29 PM
 */
"use strict";


var FromDirectoryProvider = (function(){

    //This allows us to keep the utility functions in a separate module, where they are testable, but still use them in the closure.
    var provider = require("./from-directory-utils");

    provider.fn = function(directory){
        var allModules;
        if(typeof directory == "string"){
            allModules = provider.getModulesFromDir(directory, true);
        } else if(typeof directory == "object"){
            if(!directory.dir) throw new Error("Property 'dir' is required.");
            directory.recursive = directory.recursive || true;
            allModules = provider.getModulesFromDir(directory.dir, directory.recursive);
        }
    }


    return provider.fn;
})();


module.exports = FromDirectoryProvider;