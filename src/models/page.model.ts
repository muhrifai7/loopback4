import {Entity, model, property, hasMany} from '@loopback/repository';
import {Sections, SectionsWithRelations} from './sections.model';

@model()
export class Page extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Sections)
  sections?: Sections[];

  constructor(data?: Partial<Page>) {
    super(data);
  }
}

export interface PageRelations {
  // describe navigational properties here
  section?: SectionsWithRelations;
}

export type PageWithRelations = Page & PageRelations;
