import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {Page, PageRelations, Sections} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';

import {SectionsRepository} from './sections.repository';

export class PageRepository extends DefaultCrudRepository<
  Page,
  typeof Page.prototype.id,
  PageRelations
> {
  public readonly sections: HasManyRepositoryFactory<
    Sections,
    typeof Page.prototype.id
  >;
  constructor(
    // @inject('datasources.postgres') dataSource: PostgresDataSource,
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('SectionsRepository')
    getSectionsRepository: Getter<SectionsRepository>,
  ) {
    super(Page, dataSource);
    this.sections = this.createHasManyRepositoryFactoryFor(
      'sections',
      getSectionsRepository,
    );
    this.registerInclusionResolver('sections', this.sections.inclusionResolver);
  }
}
