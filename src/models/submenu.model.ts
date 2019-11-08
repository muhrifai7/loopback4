import {Entity, model, property,belongsTo} from '@loopback/repository';

import { Menu} from './menu.model'

@model()
export class Submenu extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  title?: string;

  @property({
    type: 'string',
  })
  link?: string;

  @belongsTo(() => Menu,{name: 'menu'})
  menuId?: number;

  constructor(data?: Partial<Submenu>) {
    super(data);
  }
}

export interface SubmenuRelations {
  // describe navigational properties here
}

export type SubmenuWithRelations = Submenu & SubmenuRelations;
