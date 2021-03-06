import {Entity, model, property} from '@loopback/repository';

import {PermissionKey} from '../authorization';

@model()
export class Profile extends Entity {
  @property({
    type: 'string',
    required: true,
    id: true,
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property.array(String)
  permissions: String[];

  @property({
    type: 'string',
  })
  name?: string;

  constructor(data?: Partial<Profile>) {
    super(data);
  }
}

export interface ProfileRelations {
  // describe navigational properties here
}

export type ProfileWithRelations = Profile & ProfileRelations;
