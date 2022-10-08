import { provide } from 'inversify-binding-decorators';
import { TodoModel } from './todo.model';
import { NotFoundError } from '../../core/errors';
import { CreateTodoDto, PaginationQuery, UpdateTodoDto } from './validation';

@provide(TodosService)
export class TodosService {
  async createTodo(userId: string, createDto: CreateTodoDto) {
    return TodoModel.create({ ...createDto, userId });
  }

  async getTodos(userId: string, { page, limit, sort }: PaginationQuery) {
    const totalPromise = TodoModel.countDocuments({ userId });
    const todosPromise = TodoModel.find({
      userId,
    }).sort({ createdAt: sort })
      .skip((page - 1) * limit)
      .limit(limit);

    const [total, todos] = await Promise.all([totalPromise, todosPromise]);

    return {
      data: todos,
      total,
      page,
      limit,
    };
  }

  async getTodo(id: string, userId: string) {
    const todo = await TodoModel.findOne({
      _id: id,
      userId,
    });

    if (!todo) {
      throw new NotFoundError('requested todo doesn\'t exist');
    }
    return todo;
  }

  async updateTodo(id: string, userId: string, updateDto: UpdateTodoDto) {
    const updated = await TodoModel.findOneAndUpdate({
      _id: id,
      userId,
    }, {
      $set: updateDto,
    }, {
      new: true,
    });
    if (!updated) {
      throw new NotFoundError('target todo doesn\'t exist');
    }

    return updated;
  }

  async deleteTodo(id: string, userId: string) {
    const deleted = await TodoModel.findOneAndDelete({
      userId,
      _id: id,
    });

    if (!deleted) {
      throw new NotFoundError('target todo doesn\'t exist');
    }

    return {
      _id: deleted._id,
    };
  }

  async toggleComplete(id: string, userId: string, completed: boolean = true) {
    return this.updateTodo(id, userId, { completed });
  }
}
