# Modules

I think that, creating reusable code is one of the most important thing in software development. That's why I created this simple modular system for any application. You can use existing modules or create your own, even use third party libraries, wrap them in module, and use them.

## Running Application

All you have to do is create `Application` instance and call `run` method. But, application itself won't do you any good. To run some usefull code you have to add `Module Class`, as a parameter, to `run` method.

> `Module Class` is any class that implements `Module` interface

```js
import { Application } from '@wildebeest/js-modules'
import { RootModule } from './RootModule'

let app = new Application();
app.run([RootModule]);
```

## Running Multiple Modules

If you have multiple modules that you want to run, you can add as many Modules as you want, to run parameter.

```js
import { Application } from '@wildebeest/js-modules'
import { RootModule } from './RootModule'
import { ThirdPartyModule } from 'third-party-lib'
import { ToggleModule } from './ToggleModule'

let app = new Application();
app.run([RootModule, ThirdPartyModule, ToggleModule]);
```

## Creating Module

To create your own module, you have to create a class that implements `Module` interface. 

### getDependencies

This is how you tell application, what is your module dependant on. This method should return array of module classes that your module uses.

### register

Use `Container` to bind all your services and factories. We use `inversify` to handle `Dependency Injection`, so check their documentation. However, register method should only `bind` new classes. Don't try to `get` instances from container.

### boot

Here, you can run any code. Every service is loaded, so you can `get` instances from `container` now, and configure them. This is also a good place to run your `DOMloaded` code.

## Application stages

### Loading Dependencies

First thing, that application is trying to do, is resolve all the dependencies. Application, will load all modules provided in `run` method and resolve them by depth tree search.

> Your modules cannot contain circular dependencies.

### Registering Services

After module dependencies are resolved, we enter second stage. That is registering services and factories to application `Container`. This application is using `IoC` principles. To be more specific, we use `inversify` library. You should bind every service or implementation that your module provide to outside world.

> Do not expect to have all other services loaded at this stage

### Running Code

Third step is for configuration and running your code. All services have been bound and can be used at this stage. Now is the time to run your custom code and configure existing services.