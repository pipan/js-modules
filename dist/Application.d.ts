import "reflect-metadata";
import { Container } from "inversify";
import { Module } from "./Module";
export declare class Application {
    protected container: Container;
    protected modules: Array<any>;
    protected loadedModules: Array<Module>;
    constructor();
    run(modules?: Array<any>): void;
    getContainer(): Container;
    protected loadModule(moduleClass: any, stack?: Array<any>): void;
    protected addDependencies(modules: Array<any>, stack?: Array<any>): void;
    protected register(container: Container): void;
    protected boot(container: Container): void;
}
