import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';
//add
import {PostgresDbDataSource} from './datasources';
import {
  MyAuthBindings,
  JWTService,
  JWTStrategy,
  UserPermissionsProvider,
} from './authorization';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy,
} from '@loopback/authentication';

import {PasswordHasherBindings, UserServiceBindings} from './authorization';
import {BcryptHasher} from './authorization/services/hash.password.bcryptjs';

export class LoopBackApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    //ad postgres
    // this.dataSource(new PostgresDbDataSource());

    //add
    // Bind authentication component related elements
    this.component(AuthenticationComponent);
    // Bind JWT & permission authentication strategy related elements
    registerAuthenticationStrategy(this, JWTStrategy);
    this.bind(MyAuthBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(MyAuthBindings.USER_PERMISSIONS).toProvider(
      UserPermissionsProvider,
    );
    // password
    this.bind(PasswordHasherBindings.ROUNDS).to(0);
    this.bind(PasswordHasherBindings.PASSWORD_HASHER).toClass(BcryptHasher);
    // this.bind(UserServiceBindings.USER_SERVICE).toClass(BcryptHasher.comparePassword)
    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
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
  }

  // setUpBinding(): void {

  // }
}

// LoopBackApplication
