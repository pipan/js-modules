import 'jest';
import { Application } from '../src/Application';
import { Container, injectable } from 'inversify';

class FirstModule 
{
    getDependencies(): Array<any>
    {
        return [SecondModule];
    }
}

class SecondModule 
{
    getDependencies(): Array<any>
    {
        return [FirstModule];
    }
}

@injectable()
class Service 
{
    protected value: number = 0;

    getValue(): number
    {
        return this.value;
    }

    setValue(value: number): void
    {
        this.value = value;
    }
}

class ThirdModule
{
    getDependencies(): Array<any>
    {
        return [];
    }

    register(container: Container): void
    {
        container.bind<Service>(Service).toSelf().inSingletonScope();
    }

    boot(container: Container): void
    {
        let service = container.get<Service>(Service);
        service.setValue(100);
    }
}

test("test application circular dependency", () => {
    let app = new Application();    

    expect(() => {
        app.run([FirstModule])
    }).toThrow();
});

test("test application register service", () => {
    let app = new Application();    
    app.run([ThirdModule]);

    expect(app.getContainer().get(Service)).toBeInstanceOf(Service);
});

test("test application boot", () => {
    let app = new Application();    
    app.run([ThirdModule]);

    expect(app.getContainer().get(Service).getValue()).toBe(100);
});