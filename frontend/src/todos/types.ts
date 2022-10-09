export interface Todo {
  _id?: string;
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTodoProps {
  todo: Todo;
}

export interface DeleteTodoProps {
  todo: Todo;
}

export interface TodoListProps {
  toggleComplete: (id: string, complete: boolean) => Promise<void> | void;
}