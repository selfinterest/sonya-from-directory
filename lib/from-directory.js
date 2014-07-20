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
        var allModules, useFunctionNames;
        var options = {};
        var DEFAULT_OPTIONS =
        {
            useFunctionNames: true,
            recursive: true,
            defaultProvider: "factory"
        };

        if(typeof directory == "string"){
            options = DEFAULT_OPTIONS;
        } else if(typeof directory == "object"){

            if(!directory.dir) throw new Error("Property 'dir' is required.");
            options.recursive = directory.recursive || DEFAULT_OPTIONS.recursive;
            options.useFunctionNames = directory.useFunctionNames || DEFAULT_OPTIONS.useFunctionNames;
            options.defaultProvider = directory.defaultProvider || DEFAULT_OPTIONS.defaultProvider;
            directory = directory.dir;

        }

        allModules = provider.getModulesFromDir(directory, options.recursive);
        provider.processModules(allModules, options);
    }



    return provider.fn;
})();


module.exports = FromDirectoryProvider;