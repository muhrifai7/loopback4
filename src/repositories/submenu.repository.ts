import {DefaultCrudRepository} from '@loopback/repository';
import {Submenu, SubmenuRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SubmenuRepository extends DefaultCrudRepository<
  Submenu,
  typeof Submenu.prototype.id,
  SubmenuRelations
> {
  constructor(
    // @inject('datasources.postgres') dataSource: PostgresDataSource,
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Submenu, dataSource);
  }
}
