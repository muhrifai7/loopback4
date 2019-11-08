import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
} from '@loopback/repository';
import {Content} from './content.model';
import {Page, PageWithRelations} from './page.model';

@model()
export class Sections extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Page)
  pageId: number;

  @property({
    type: 'string',
  })
  name?: string;

  @property({
    type: 'string',
  })
  header?: string;

  @property({
    type: 'string',
  })
  sub_header?: string;

  @hasMany(() => Content, {keyTo: 'sectionsId'})
  content?: Content[];

  constructor(data?: Partial<Sections>) {
    super(data);
  }
}

export interface SectionsRelations {
  // describe navigational properties here
  page?: PageWithRelations;
}

export type SectionsWithRelations = Sections & SectionsRelations;
