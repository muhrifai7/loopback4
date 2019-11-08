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
import {Submenu} from '../models';
import {SubmenuRepository} from '../repositories';

export class SubmenuController {
  constructor(
    @repository(SubmenuRepository)
    public submenuRepository: SubmenuRepository,
  ) {}

  @post('/submenus', {
    responses: {
      '200': {
        description: 'Submenu model instance',
        content: {'application/json': {schema: getModelSchemaRef(Submenu)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Submenu, {
            title: 'NewSubmenu',
            exclude: ['id'],
          }),
        },
      },
    })
    submenu: Omit<Submenu, 'id'>,
  ): Promise<Submenu> {
    return this.submenuRepository.create(submenu);
  }

  @get('/submenus/count', {
    responses: {
      '200': {
        description: 'Submenu model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Submenu))
    where?: Where<Submenu>,
  ): Promise<Count> {
    return this.submenuRepository.count(where);
  }

  // @get('/submenus', {
  //   responses: {
  //     '200': {
  //       description: 'Array of Submenu model instances',
  //       content: {
  //         'application/json': {
  //           schema: {type: 'array', items: getModelSchemaRef(Submenu)},
  //         },
  //       },
  //     },
  //   },
  // })
  // async find(
  //   @param.query.object('filter') filter?: Filter<Submenu>,
  // ): Promise<Submenu[]> {
  //   return this.submenuRepository.find(filter);
  // }

  @patch('/submenus', {
    responses: {
      '200': {
        description: 'Submenu PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Submenu, {partial: true}),
        },
      },
    })
    submenu: Submenu,
    @param.query.object('where', getWhereSchemaFor(Submenu))
    where?: Where<Submenu>,
  ): Promise<Count> {
    return this.submenuRepository.updateAll(submenu, where);
  }

  @get('/submenus/{id}', {
    responses: {
      '200': {
        description: 'Submenu model instance',
        content: {'application/json': {schema: getModelSchemaRef(Submenu)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Submenu> {
    return this.submenuRepository.findById(id);
  }

  @patch('/submenus/{id}', {
    responses: {
      '204': {
        description: 'Submenu PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Submenu, {partial: true}),
        },
      },
    })
    submenu: Submenu,
  ): Promise<void> {
    await this.submenuRepository.updateById(id, submenu);
  }

  @put('/submenus/{id}', {
    responses: {
      '204': {
        description: 'Submenu PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() submenu: Submenu,
  ): Promise<void> {
    await this.submenuRepository.replaceById(id, submenu);
  }

  @del('/submenus/{id}', {
    responses: {
      '204': {
        description: 'Submenu DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.submenuRepository.deleteById(id);
  }
}
