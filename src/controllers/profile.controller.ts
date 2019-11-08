import {inject, Getter} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {
  MyUserProfile,
  Credential,
  MyAuthBindings,
  PermissionKey,
  CredentialsRequestBody,
  UserRequestBody,
  UserProfileSchema,
  JWTService,
} from '../authorization';
import {
  authenticate,
  AuthenticationBindings,
  UserService,
} from '@loopback/authentication';
import {HttpErrors} from '@loopback/rest';
import {Profile} from '../models';
import {ProfileRepository} from '../repositories';
import {PasswordHasherBindings, UserServiceBindings} from '../authorization';
import {PasswordHasher} from '../authorization/services/hash.password.bcryptjs';
// import {Credentials} from '../repositories/profile.repository';
export class ProfileController {
  constructor(
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
    @inject(MyAuthBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    public getCurrentUser: Getter<MyUserProfile>,
    //add password
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    private passwordHasher: PasswordHasher,
  ) // @inject(UserServiceBindings.USER_SERVICE)
  // public userService: UserService<Profile, Credentials>,
  {}

  @post('/profile', {
    responses: {
      '200': {
        description: 'Profile model instance',
        content: {'application/json': {schema: {'x-ts-type': Profile}}},
      },
    },
  })
  async create(
    @requestBody(UserRequestBody) profile: Profile,
  ): Promise<Profile> {
    profile.password = await this.passwordHasher.hashPassword(profile.password);
    console.log('password hasher', profile);
    profile.permissions = [
      PermissionKey.ViewOwnUser,
      PermissionKey.CreateUser,
      PermissionKey.UpdateOwnUser,
      PermissionKey.DeleteOwnUser,
    ];
    if (await this.profileRepository.exists(profile.email)) {
      throw new HttpErrors.BadRequest(`This email already exists`);
    } else {
      const savedCharacter = await this.profileRepository.create(profile);
      delete savedCharacter.password;
      return savedCharacter;
    }
  }
  //add
  /**
   * user login
   * @param credentials email and password
   */
  @post('/profile/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {},
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credential: Credential,
  ): Promise<{token: string}> {
    // const user = await this.userService.verifyCredentials(credential);
    // console.log(user);
    const token = await this.jwtService.getToken(credential);
    return {token};
  }

  @get('/profile/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.ViewOwnUser]})
  async printCurrentUser(): Promise<MyUserProfile> {
    console.log(this.getCurrentUser());
    return this.getCurrentUser();
  }

  @patch('/profile/name', {
    responses: {
      '200': {
        description: 'Character model instance',
        content: {'application/json': {schema: {'x-ts-type': Profile}}},
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.ViewOwnUser]})
  async changeName(@requestBody() newName: Partial<Profile>): Promise<void> {
    const currentUser = await this.getCurrentUser();
    let char: Profile = await this.profileRepository.findById(
      currentUser.email,
    );
    console.log(char);
    char.name = newName.name!;
    return await this.profileRepository.updateById(currentUser.email, char);
  }

  @get('/profiles', {
    responses: {
      '200': {
        description: 'Profile model instance',
        content: {'application/json': {schema: {'x-ts-type': Profile}}},
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.ViewOwnUser]})
  async findById(): Promise<Profile> {
    const currentUser = await this.getCurrentUser();
    return await this.profileRepository.findById(currentUser.email);
  }
  @del('/profile', {
    responses: {
      '204': {
        description: 'Profile DELETE success',
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.DeleteOwnUser]})
  async deleteById(): Promise<void> {
    const currentUser = await this.getCurrentUser();
    console.log(currentUser);
    await this.profileRepository.deleteById(currentUser.email);
    // await this.profileRepository.deleteById(id);
  }
}
