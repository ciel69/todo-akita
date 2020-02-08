import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';

import { VISIBILITY_FILTER } from '@/model/filter.model';
import { Todo, createTodo } from '@/model/todo.model';
import { TodosStore } from './todos.store';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private todosStore: TodosStore
  ) {}
  // region
  add(title: string): void {
    const todo = createTodo({ id: Math.random(), title });
    this.todosStore.add(todo);
  }

  complete({ id, completed }: Todo): void {
    this.todosStore.update(id, {
      completed
    });
  }

  delete(id: ID): void {
    this.todosStore.remove(id);
  }

  updateFilter(filter: VISIBILITY_FILTER): void {
    this.todosStore.update({
      ui: {
        filter
      }
    });
  }
  // endregion
}
