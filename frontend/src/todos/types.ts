export interface Todo {
  _id?: string;
  title: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateTodoProps {
  todo: Todo;
  updateTodo: (id: string, updatedTodo: Todo, onClose: () => void) => Promise<void> | void;
}

export interface DeleteTodoProps {
  todo: Todo;
  deleteTodo: (id: string, onClose: () => void) => Promise<void> | void;
}

export interface AddTodoProps {
  addTodo: (todo: Todo) => Promise<void> | void;
}

export interface TodoListProps {
  updateTodo: (id: string, updatedTodo: Todo, onClose: () => void) => Promise<void> | void;
  deleteTodo: (id: string, onClose: () => void) => Promise<void> | void;
  toggleComplete: (id: string, complete: boolean) => Promise<void> | void;
}