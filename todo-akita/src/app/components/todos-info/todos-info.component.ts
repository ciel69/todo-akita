import {ChangeDetectionStrategy, Component} from '@angular/core';

import {TodosQuery} from '@/store/todos/todos.query';

@Component({
  selector: 'app-todos-info',
  template: `
    <div>
      <p>Всего: {{todosQuery.allCountTodos$ | async}}</p>
      <p>Выполненных: {{todosQuery.activeCountTodos$ | async}}</p>
      <p>Активных: {{todosQuery.completedCountTodos$ | async}}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosInfoComponent {

  constructor(
    private todosQuery: TodosQuery
  ) {
  }
}
