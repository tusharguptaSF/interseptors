import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingScope} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {CheckInterceptor} from './interceptors';
import {MySequence} from './sequence';
export {ApplicationConfig};
export class GlobalCounter {
  public count = 0;
}

export class JwtdemoApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },

    };
    // this.interceptor(NameconvetorInterceptor, {
    //   global: false,
    //   key: 'name-interceptor',
    // });
    this.interceptor(CheckInterceptor, {

      key: 'check-interceptor',
    });


    this.bind('global-counter')
      .toClass(GlobalCounter)
      .inScope(BindingScope.SINGLETON);
  }
}
