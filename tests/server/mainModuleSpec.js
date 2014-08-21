/**
 * Created by: Terrence C. Watson
 * Date: 7/20/14
 * Time: 12:41 AM
 */
describe("Sonya main module", function (){
    it("should add itself to provideClass prototype", function(){
        require("../../lib/main.js");
        var provideClass = require("sonya/lib/lib/provide-class.js");
        expect(typeof provideClass.prototype.types.fromDirectory).toBe("function");
        //var sonya = require("sonya");
        //expect(typeof sonya.Provide.fromDirectory).toBe("function");
    });

    it("should be added to Provide if required before Provide is required", function(){
        require("../../lib/main.js");
        var provideClass = require("sonya/lib/lib/provide-class.js");
        expect(typeof provideClass.prototype.types.fromDirectory).toBe("function");
        var Sonya = require("sonya");
        //var Provide = require("sonya/lib/provide.js");
        expect(Sonya.Provide.fromDirectory).toBeDefined();
    });

    /*it("should be able to get options", function(){
       require("../../lib/main.js");
    });*/

    it("should be able to register providers with the injector", function(){
       require("../../lib/main.js");

       var sonya = require("sonya");
       sonya.Provide.fromDirectory({
           dir: "./tests/server/fixtures",
           recursive: true,
           useFunctionNames: true
       });


       sonya.Injector.invoke(function(SeneaFactory, AmalaFactory){
            expect(SeneaFactory).toBe("Senea");
            expect(AmalaFactory).toBe("Senea and Amala.");
       });
    });

});