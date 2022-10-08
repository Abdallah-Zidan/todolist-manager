import { Todo } from './types';
import axios from '../shared/axios';


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

export async function toggleComplete({id,completed}:{id:string,completed:boolean}) {
  const response = await axios.put(`/todos/${id}/${completed ? 'complete' : 'incomplete'}`);
  return response.data;
}