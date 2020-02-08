import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {action, ID} from '@datorama/akita';

import {Todo} from '@/model/todo.model';
import {TodosService} from '@/store/todos/todos.service';

@Component({
  selector: 'app-todos',
  template: `
    <div class="collection with-header">
      <h4 class="collection-header">Todos:</h4>
      <app-todo-element
        *ngFor="let todo of todos"
        class="collection-item"
        (delete)="delete.emit($event)"
        (complete)="complete.emit($event)"
        [todo]="todo"
      ></app-todo-element>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {

  @Input()
  todos: Todo[];

  @Output()
  complete = new EventEmitter<Todo>();

  @Output()
  delete = new EventEmitter<ID>();

  constructor(
    private todosService: TodosService
  ) {
  }

  @action('Todos delete todo')
  deleteTodo(id): void {
    this.todosService.delete(id);
  }

}
