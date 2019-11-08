import {BindingKey} from '@loopback/context';
import {UserPermissionsFn} from './types';
import {TokenService, UserService} from '@loopback/authentication';
import {PasswordHasher} from './services/hash.password.bcryptjs';
import {Profile} from '../models';
import {Credentials} from '../repositories';

/**
 * Binding keys used by this component.
 */
export namespace MyAuthBindings {
  export const USER_PERMISSIONS = BindingKey.create<UserPermissionsFn>(
    'userAuthorization.actions.userPermissions',
  );

  export const TOKEN_SERVICE = BindingKey.create<TokenService>(
    'services.authentication.jwt.tokenservice',
  );
}

export namespace TokenServiceConstants {
  export const TOKEN_SECRET_VALUE = 'myjwts3cr3t';
  export const TOKEN_EXPIRES_IN_VALUE = '600000';
}
// password hash
export namespace PasswordHasherBindings {
  export const PASSWORD_HASHER = BindingKey.create<PasswordHasher>(
    'services.hasher',
  );
  export const ROUNDS = BindingKey.create<number>('services.hasher.round');
}

export namespace UserServiceBindings {
  export const USER_SERVICE = BindingKey.create<
    UserService<Profile, Credentials>
  >('services.user.service');
}
