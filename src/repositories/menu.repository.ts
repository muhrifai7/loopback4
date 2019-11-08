import {DefaultCrudRepository,juggler,
  HasManyRepositoryFactory,
  repository,} from '@loopback/repository';import {DbDataSource} from '../datasources';
import {inject,Getter} from '@loopback/core';
import {SubmenuRepository} from './submenu.repository';
import {Submenu, Menu, MenuRelations} from '../models';

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype.id,
  MenuRelations
> {
  public readonly submenus: HasManyRepositoryFactory<
  Submenu,
  typeof Menu.prototype.id
>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    // @inject('datasources.postgres') dataSource: PostgresDataSource,
    @repository.getter('SubmenuRepository')
    getSubmenuRepository: Getter<SubmenuRepository>,
  ) {
    super(Menu, dataSource);
    this.submenus = this.createHasManyRepositoryFactoryFor(
      'submenus',
      getSubmenuRepository,
    );
    this.registerInclusionResolver('submenus', this.submenus.inclusionResolver);
  }
}
