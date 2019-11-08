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
import {Content} from '../models';
import {ContentRepository} from '../repositories';

export class ContentController {
  constructor(
    @repository(ContentRepository)
    public contentRepository: ContentRepository,
  ) {}

  @post('/contents', {
    responses: {
      '200': {
        description: 'Content model instance',
        content: {'application/json': {schema: getModelSchemaRef(Content)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Content, {
            title: 'NewContent',
          }),
        },
      },
    })
    content: Content,
  ): Promise<Content> {
    return this.contentRepository.create(content);
  }

  @get('/contents/count', {
    responses: {
      '200': {
        description: 'Content model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Content))
    where?: Where<Content>,
  ): Promise<Count> {
    return this.contentRepository.count(where);
  }

  // @get('/contents', {
  //   responses: {
  //     '200': {
  //       description: 'Array of Content model instances',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'array', items: getModelSchemaRef(Content)},
  //         },
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.query.object('filter') filter?: Filter<Content>,
  // ): Promise<Content[]> {
  //   return this.contentRepository.find(filter);
  // }

  @patch('/contents', {
    responses: {
      '200': {
        description: 'Content PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Content, {partial: true}),
        },
      },
    })
    content: Content,
    @param.query.object('where', getWhereSchemaFor(Content))
    where?: Where<Content>,
  ): Promise<Count> {
    return this.contentRepository.updateAll(content, where);
  }

  @get('/contents/{id}', {
    responses: {
      '200': {
        description: 'Content model instance',
        content: {'application/json': {schema: getModelSchemaRef(Content)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Content> {
    return this.contentRepository.findById(id);
  }

  @patch('/contents/{id}', {
    responses: {
      '204': {
        description: 'Content PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Content, {partial: true}),
        },
      },
    })
    content: Content,
  ): Promise<void> {
    await this.contentRepository.updateById(id, content);
  }

  @put('/contents/{id}', {
    responses: {
      '204': {
        description: 'Content PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() content: Content,
  ): Promise<void> {
    await this.contentRepository.replaceById(id, content);
  }

  @del('/contents/{id}', {
    responses: {
      '204': {
        description: 'Content DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.contentRepository.deleteById(id);
  }
}
