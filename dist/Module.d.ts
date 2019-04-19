import { Container } from "inversify";
export interface Module {
    register(container: Container): void;
    boot(container: Container): void;
    getDependencies(): Array<any>;
}
