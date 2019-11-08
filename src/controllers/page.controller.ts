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
import {Page} from '../models';
import {PageRepository} from '../repositories';

export class PageController {
  constructor(
    @repository(PageRepository)
    public pageRepository: PageRepository,
  ) {}

  @post('/pages', {
    responses: {
      '200': {
        description: 'Page model instance',
        content: {'application/json': {schema: getModelSchemaRef(Page)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Page, {
            title: 'NewPage',
            exclude: ['id'],
          }),
        },
      },
    })
    page: Omit<Page, 'id'>,
  ): Promise<Page> {
    return this.pageRepository.create(page);
  }

  @get('/pages/count', {
    responses: {
      '200': {
        description: 'Page model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Page)) where?: Where<Page>,
  ): Promise<Count> {
    return this.pageRepository.count(where);
  }

  @get('/pages', {
    responses: {
      '200': {
        description: 'Array of Page model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Page)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter')
    filter?: Filter<Page>,
  ): Promise<Page[]> {
    return this.pageRepository.find({
      include: [{relation: 'sections'}],
    });
  }

  @patch('/pages', {
    responses: {
      '200': {
        description: 'Page PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Page, {partial: true}),
        },
      },
    })
    page: Page,
    @param.query.object('where', getWhereSchemaFor(Page)) where?: Where<Page>,
  ): Promise<Count> {
    return this.pageRepository.updateAll(page, where);
  }

  @get('/pages/{id}', {
    responses: {
      '200': {
        description: 'Page model instance',
        content: {'application/json': {schema: getModelSchemaRef(Page)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Page> {
    return this.pageRepository.findById(id, {
      include: [{relation: 'sections'}],
    });
  }

  @patch('/pages/{id}', {
    responses: {
      '204': {
        description: 'Page PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Page, {partial: true}),
        },
      },
    })
    page: Page,
  ): Promise<void> {
    await this.pageRepository.updateById(id, page);
  }

  @put('/pages/{id}', {
    responses: {
      '204': {
        description: 'Page PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() page: Page,
  ): Promise<void> {
    await this.pageRepository.replaceById(id, page);
  }

  @del('/pages/{id}', {
    responses: {
      '204': {
        description: 'Page DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pageRepository.deleteById(id);
  }
}
