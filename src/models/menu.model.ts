import {Entity, model, property,hasMany} from '@loopback/repository';

import { Submenu} from './submenu.model'

@model()
export class Menu extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @hasMany(() => Submenu,{keyTo : 'menuId'})
  submenus?: Submenu[];

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // describe navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;
