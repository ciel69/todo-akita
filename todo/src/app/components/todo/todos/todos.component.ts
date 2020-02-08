import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from '@/model/todo.model';

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
    </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {

  @Output()
  complete = new EventEmitter<Todo>();

  @Output()
  delete = new EventEmitter<number>();

  @Input()
  todos: Todo[];

}
