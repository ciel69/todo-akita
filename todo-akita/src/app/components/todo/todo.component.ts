import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ID} from '@datorama/akita';
import {Observable} from 'rxjs';

import {Todo} from '@/model/todo.model';
import {VISIBILITY_FILTER, initialFilters} from '@/model/filter.model';
import {TodosService} from '@/store/todos/todos.service';
import {TodosQuery} from '@/store/todos/todos.query';

@Component({
  selector: 'app-todo',
  template: `
    <app-todo-form (addTodo)="add($event)"></app-todo-form>
    <app-todos-filters
      [filters]="filters"
      [active]="activeFilter$ | async"
      (update)="changeFilter($event)"
    ></app-todos-filters>
    <app-todos
      [todos]="todos$ | async"
      (delete)="delete($event)"
      (complete)="complete($event)"
    ></app-todos>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoComponent implements OnInit {

  todos$: Observable<Todo[]>;
  activeFilter$: Observable<VISIBILITY_FILTER>;
  filters = initialFilters;

  constructor(
    private todosQuery: TodosQuery,
    private todosService: TodosService
  ) {
  }

  ngOnInit(): void {
    this.todos$ = this.todosQuery.selectVisibleTodos$;
    this.activeFilter$ = this.todosQuery.selectVisibilityFilter$;
  }

  add(title: string): void {
    this.todosService.add(title);
  }

  complete(todo: Todo): void {
    this.todosService.complete(todo);
  }

  delete(id: ID): void {
    this.todosService.delete(id);
  }

  changeFilter(filter: VISIBILITY_FILTER): void {
    this.todosService.updateFilter(filter);
  }

}
