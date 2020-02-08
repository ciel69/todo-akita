import {Component} from '@angular/core';

import {createTodo, Todo} from '@/model/todo.model';
import {initialFilters, VISIBILITY_FILTER} from '@/model/filter.model';

@Component({
  selector: 'app-todo',
  template: `
    <app-todo-form (addTodo)="add($event)"></app-todo-form>
    <app-todo-filter
      [filters]="filters"
      [active]="activeFilter"
      (update)="changeFilter($event)"
    ></app-todo-filter>
    <app-todos
      [todos]="filterTodos"
      (complete)="complete($event)"
      (delete)="delete($event)"
    ></app-todos>`
})
export class TodoComponent {

  todos: Todo[] = [];
  filters = initialFilters;
  activeFilter: VISIBILITY_FILTER = VISIBILITY_FILTER.SHOW_ALL;

  private filter = {
    [VISIBILITY_FILTER.SHOW_COMPLETED]: () => this.todos.filter(t => t.completed),
    [VISIBILITY_FILTER.SHOW_ACTIVE]: () => this.todos.filter(t => !t.completed),
    default: () => this.todos,
  };

  get filterTodos(): Todo[] {
    return (this.filter[this.activeFilter] || this.filter.default)();
  }

  add(title: string): void {
    const todo = createTodo({id: Math.random(), title});
    this.todos = [...this.todos, todo];
  }

  complete({id, completed}: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === id);
    this.todos[index].completed = completed;
    this.todos = [...this.todos];
  }

  delete(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  changeFilter(filter: VISIBILITY_FILTER): void {
    this.activeFilter = filter;
  }

}
