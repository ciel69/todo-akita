import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {Todo} from '@/model/todo.model';

@Component({
  selector: 'app-todos-info',
  template: `
    <div>
      <p>Всего: {{todos.length}}</p>
      <p>Выполненных: {{completedTodos}}</p>
      <p>Активных: {{activeTodos}}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosInfoComponent {

  @Input()
  todos: Todo[] = [];

  get completedTodos(): number {
    return this.todos.filter((todo) => todo.completed).length;
  }

  get activeTodos(): number {
    return this.todos.filter((todo) => !todo.completed).length;
  }
}
