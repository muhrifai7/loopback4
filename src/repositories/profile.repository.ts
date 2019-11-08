import {DefaultCrudRepository} from '@loopback/repository';
import {Profile, ProfileRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export type Credentials = {
  email: string;
  password: string;
};
export class ProfileRepository extends DefaultCrudRepository<
  Profile,
  typeof Profile.prototype.email,
  ProfileRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    // @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Profile, dataSource);
  }
}
