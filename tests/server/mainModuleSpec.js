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
        var Provide = require("sonya/lib/provide.js");
        expect(Provide.fromDirectory).toBeDefined();
    });

});