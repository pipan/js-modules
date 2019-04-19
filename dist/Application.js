"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var inversify_1 = require("inversify");
var Application = (function () {
    function Application() {
        this.modules = [];
        this.loadedModules = [];
        this.container = new inversify_1.Container();
    }
    Application.prototype.run = function (modules) {
        if (modules === void 0) { modules = []; }
        this.addDependencies(modules);
        this.register(this.container);
        this.boot(this.container);
    };
    Application.prototype.getContainer = function () {
        return this.container;
    };
    Application.prototype.loadModule = function (moduleClass, stack) {
        if (stack === void 0) { stack = []; }
        if (stack.indexOf(moduleClass) > -1) {
            throw "Modules circular dependency detected at: '" + moduleClass + '. Full stack of dependencies: ' + stack.join(", ");
        }
        stack = stack.slice(0);
        stack.push(moduleClass);
        if (this.modules.indexOf(moduleClass) > -1) {
            return;
        }
        this.modules.push(moduleClass);
        var module = new moduleClass();
        this.addDependencies(module.getDependencies(), stack);
        if (this.loadedModules.indexOf(module) > -1) {
            return;
        }
        this.loadedModules.push(module);
    };
    Application.prototype.addDependencies = function (modules, stack) {
        if (stack === void 0) { stack = []; }
        for (var i = 0; i < modules.length; i++) {
            this.loadModule(modules[i], stack);
        }
    };
    Application.prototype.register = function (container) {
        for (var i = 0; i < this.loadedModules.length; i++) {
            this.loadedModules[i].register(container);
        }
    };
    Application.prototype.boot = function (container) {
        for (var i = 0; i < this.loadedModules.length; i++) {
            this.loadedModules[i].boot(container);
        }
    };
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=Application.js.map