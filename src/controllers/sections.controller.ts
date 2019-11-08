import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Sections} from '../models';
import {SectionsRepository} from '../repositories';

export class SectionsController {
  constructor(
    @repository(SectionsRepository)
    public sectionsRepository: SectionsRepository,
  ) {}

  @post('/sections', {
    responses: {
      '200': {
        description: 'Sections model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sections)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sections, {
            title: 'NewSections',
          }),
        },
      },
    })
    sections: Sections,
  ): Promise<Sections> {
    console.log(sections);
    return this.sectionsRepository.create(sections);
  }

  @get('/sections/count', {
    responses: {
      '200': {
        description: 'Sections model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Sections))
    where?: Where<Sections>,
  ): Promise<Count> {
    return this.sectionsRepository.count(where);
  }

  @get('/sections', {
    responses: {
      '200': {
        description: 'Array of Sections model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sections)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter')
    filter?: Filter<Sections>,
  ): Promise<Sections[]> {
    return this.sectionsRepository.find({
      include: [{relation: 'content'}],
    });
  }

  @patch('/sections', {
    responses: {
      '200': {
        description: 'Sections PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sections, {partial: true}),
        },
      },
    })
    sections: Sections,
    @param.query.object('where', getWhereSchemaFor(Sections))
    where?: Where<Sections>,
  ): Promise<Count> {
    return this.sectionsRepository.updateAll(sections, where);
  }

  @get('/sections/{id}', {
    responses: {
      '200': {
        description: 'Sections model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sections)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Sections> {
    return this.sectionsRepository.findById(id, {
      include: [{relation: 'content'}],
    });
  }

  @patch('/sections/{id}', {
    responses: {
      '204': {
        description: 'Sections PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sections, {partial: true}),
        },
      },
    })
    sections: Sections,
  ): Promise<void> {
    await this.sectionsRepository.updateById(id, sections);
  }

  @put('/sections/{id}', {
    responses: {
      '204': {
        description: 'Sections PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sections: Sections,
  ): Promise<void> {
    await this.sectionsRepository.replaceById(id, sections);
  }

  @del('/sections/{id}', {
    responses: {
      '204': {
        description: 'Sections DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sectionsRepository.deleteById(id);
  }
}
