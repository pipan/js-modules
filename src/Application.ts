import "reflect-metadata";
import { Container } from "inversify";
import { Module } from "./Module";

export class Application
{
    protected container: Container;
    protected modules: Array<any> = [];
    protected loadedModules: Array<Module> = [];

    constructor()
    {
        this.container = new Container();
    }

    public run(modules: Array<any> = []): void
    {
        this.addDependencies(modules);

        this.register(this.container);
        this.boot(this.container);
    }

    public getContainer(): Container
    {
        return this.container;
    }

    protected loadModule(moduleClass: any, stack: Array<any> = []): void
    {
        if (stack.indexOf(moduleClass) > -1) {
            throw new Error("Modules circular dependency detected at: '" + moduleClass + "'. Full stack of dependencies: " + stack.join(", "));
        }
        stack = stack.slice(0);
         stack.push(moduleClass);
        if (this.modules.indexOf(moduleClass) > -1) {
            return;
        }
        this.modules.push(moduleClass);
        let module = new moduleClass();
        this.addDependencies(module.getDependencies(), stack);
        if (this.loadedModules.indexOf(module) > -1) {
            return;
        }
        this.loadedModules.push(module);
    }

    protected addDependencies(modules: Array<any>, stack: Array<any> = []): void
    {
        for (let i = 0; i < modules.length; i++) {
            this.loadModule(modules[i], stack);
        }
    }

    public register(container: Container): void
    {
        for (let i = 0; i < this.loadedModules.length; i++) {
            this.loadedModules[i].register(container);
        }
    }

    public boot(container: Container): void
    {
        for (let i = 0; i < this.loadedModules.length; i++) {
            this.loadedModules[i].boot(container);
        }
    }
}