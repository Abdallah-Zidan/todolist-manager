import { Todo } from './types';
import axios from '../shared/axios';
import { raw } from 'concurrently/dist/src/defaults';


export async function getTodos(): Promise<Todo[]> {
  const response = await axios.get<{ data: Todo[] }>('/todos');
  return response.data.data;
}

export async function postTodo(todo: Todo) {
  const response = await axios.post<Todo>('/todos', todo);
  return response.data;
}

export async function updateTodo(todo: Todo) {
  const response = await axios.put(`/todos/${todo._id}`, todo);
  return response.data;
}

export async function deleteTodo(id: string) {
  const response = await axios.delete(`/todos/${id}`);
  return response.data;
}

export async function completeTodo(id: string) {
  const response = await axios.put(`/todos/${id}`);
  return response.data;
}