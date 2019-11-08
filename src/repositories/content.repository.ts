import {DefaultCrudRepository} from '@loopback/repository';
import {Content, ContentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ContentRepository extends DefaultCrudRepository<
  Content,
  typeof Content.prototype.id,
  ContentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Content, dataSource);
  }
}
