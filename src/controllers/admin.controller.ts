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

export class AdminController {
  constructor(
    @repository(ProfileRepository)
    public profileRepository: ProfileRepository,
  ) {}

  @post('/admin', {
    responses: {
      '200': {
        description: 'create admin',
        content: {'application/json': {schema: {'x-ts-type': Profile}}},
      },
    },
  })
  async create(
    @param.query.string('code') admin_code: string,
    @requestBody() profile: Profile,
  ): Promise<Profile> {
    if (admin_code == 'admin') {
      profile.permissions = [
        PermissionKey.ViewOwnUser,
        PermissionKey.CreateUser,
        PermissionKey.UpdateOwnUser,
        PermissionKey.DeleteOwnUser,
        PermissionKey.ViewAnyUser,
      ];
    } else if (admin_code == 'super_admin') {
      profile.permissions = [
        PermissionKey.ViewOwnUser,
        PermissionKey.CreateUser,
        PermissionKey.UpdateOwnUser,
        PermissionKey.DeleteOwnUser,
        PermissionKey.UpdateAnyUser,
        PermissionKey.ViewAnyUser,
        PermissionKey.DeleteAnyUser,
      ];
    } else {
      throw new HttpErrors.Forbidden('WRONG_ADMIN_CODE');
    }
    if (await this.profileRepository.exists(profile.email)) {
      throw new HttpErrors.BadRequest(`This email already exists`);
    } else {
      const savedProfile = await this.profileRepository.create(profile);
      delete savedProfile.password;
      return savedProfile;
    }
  }

  @get('/admin/profile/count', {
    responses: {
      '200': {
        description: 'Profile model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.ViewAnyUser]})
  async count(
    @param.query.object('where', getWhereSchemaFor(Profile))
    where?: Where<Profile>,
  ): Promise<Count> {
    return await this.profileRepository.count(where);
  }

  @get('/admin/profiles', {
    responses: {
      '200': {
        description: 'Array of Profile model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Profile}},
          },
        },
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.ViewAnyUser]})
  async find(
    @param.query.object('filter', getFilterSchemaFor(Profile))
    filter?: Filter<Profile>,
  ): Promise<Profile[]> {
    return await this.profileRepository.find(filter);
  }
  @patch('/admin/profiles', {
    responses: {
      '200': {
        description: 'Profile PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt', {
    required: [PermissionKey.ViewAnyUser, PermissionKey.UpdateAnyUser],
  })
  async updateAll(
    @requestBody() profile: Profile,
    @param.query.object('where', getWhereSchemaFor(Profile))
    where?: Where<Profile>,
  ): Promise<Count> {
    return await this.profileRepository.updateAll(profile, where);
  }
  /**
   * show character by email
   * @param email email
   */
  @get('/admin/profile/{email}', {
    responses: {
      '200': {
        description: 'Profile model instance',
        content: {'application/json': {schema: {'x-ts-type': Profile}}},
      },
    },
  })
  @authenticate('jwt', {required: [PermissionKey.ViewAnyUser]})
  async findById(@param.path.string('email') email: string): Promise<Profile> {
    return await this.profileRepository.findById(email);
  }

  @patch('/admin/profile/{email}', {
    responses: {
      '204': {
        description: 'Profile PATCH success',
      },
    },
  })
  @authenticate('jwt', {
    required: [PermissionKey.ViewAnyUser, PermissionKey.UpdateAnyUser],
  })
  async updateById(
    @param.query.string('email') email: string,
    @requestBody() profile: Profile,
  ): Promise<void> {
    await this.profileRepository.updateById(email, profile);
  }
  @del('/admin/profile/{email}', {
    responses: {
      '204': {
        description: 'Profile DELETE success',
      },
    },
  })
  @authenticate('jwt', {
    required: [PermissionKey.ViewAnyUser, PermissionKey.DeleteAnyUser],
  })
  async deleteById(@param.path.string('email') email: string): Promise<void> {
    //delete
    await this.profileRepository.deleteById(email);
  }
}
