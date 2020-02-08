
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function createTodo({ id, title }: Partial<Todo>): Todo {
  return {
    id,
    title,
    completed: false
  } as Todo;
}
