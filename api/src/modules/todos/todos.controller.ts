import {
  controller,
  httpDelete,
  httpGet,
  httpPost,
  interfaces,
  request,
  requestBody,
  httpPut,
  queryParam,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';

import { TodosService } from './todos.service';
import { validate } from '../../core/middlewares';
import { authJwt, reqUserId } from '../auth/util';

import {
  CreateTodoDto,
  createTodoSchema, PaginationQuery,
  paginationQuery,
  todoParams,
  UpdateTodoDto,
  updateTodoSchema,
} from './validation';

@controller('/todos', authJwt())
export class TodosController implements interfaces.Controller {
  constructor(
    @inject(TodosService) private todosService: TodosService,
  ) {
  }

  @httpPost('/', validate(createTodoSchema))
  private async createTodo(@requestBody() todo: CreateTodoDto, @request() req: Request) {
    return this.todosService.createTodo(reqUserId(req), todo);
  }

  @httpPut('/:id', validate(updateTodoSchema), validate(todoParams, 'params'))
  private async update(@requestBody() todo: UpdateTodoDto, @request() req: Request) {
    return this.todosService.updateTodo(req.params.id, reqUserId(req), todo);
  }

  @httpPut('/:id/complete', validate(todoParams, 'params'))
  private async completeTodo(@request() req: Request) {
    return this.todosService.completeTodo(req.params.id, reqUserId(req));
  }

  @httpGet('/', validate(paginationQuery, 'query'))
  private async getTodos(@request() req: Request, @queryParam() query: PaginationQuery) {
    return this.todosService.getTodos(reqUserId(req), query);
  }

  @httpGet('/:id', validate(todoParams, 'params'))
  private async getById(@request() req: Request) {
    return this.todosService.getTodo(req.params.id, reqUserId(req));
  }

  @httpDelete('/:id', validate(todoParams, 'params'))
  private async deleteTodo(@request() req: Request) {
    return this.todosService.deleteTodo(req.params.id, reqUserId(req));
  }
}
