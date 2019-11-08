import {
  DefaultCrudRepository,
  BelongsToAccessor,
  repository,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {Sections, SectionsRelations, Page, Content} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PageRepository} from './page.repository';
import {ContentRepository} from './content.repository';
export class SectionsRepository extends DefaultCrudRepository<
  Sections,
  typeof Sections.prototype.id,
  SectionsRelations
> {
  public readonly page: BelongsToAccessor<Page, typeof Sections.prototype.id>;
  public readonly content: HasManyRepositoryFactory<
    Content,
    typeof Sections.prototype.id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    // @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('ContentRepository')
    protected contentRepositoryGetter: Getter<ContentRepository>,
  ) {
    super(Sections, dataSource);
    this.content = this.createHasManyRepositoryFactoryFor(
      'content',
      contentRepositoryGetter,
    );
    this.registerInclusionResolver('content', this.content.inclusionResolver);
  }
}
