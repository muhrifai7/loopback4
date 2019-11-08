import {Entity, model, property,belongsTo} from '@loopback/repository';

import { Sections } from './sections.model'

@model()
export class Content extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(()=> Sections )
  // type: Sections;
  sectionsId: number;

  @property({
    type: 'string',
  })
  desc?: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  image_title?: string;

  @property({
    type: 'string',
  })
  header?: string;

  @property({
    type: 'string',
  })
  sub_header?: string;


  constructor(data?: Partial<Content>) {
    super(data);
  }
}

export interface ContentRelations {
  // describe navigational properties here
}

export type ContentWithRelations = Content & ContentRelations;
