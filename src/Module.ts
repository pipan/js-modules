import { Container } from "inversify";
import { Application } from "./Application";

export interface Module
{
    register(container: Container): void;
    boot(container: Container): void;
    getDependencies(): Array<any>;
}