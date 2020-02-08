import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {combineLatest} from 'rxjs';

import {VISIBILITY_FILTER} from '@/model/filter.model';
import {Todo} from '@/model/todo.model';
import {TodosState, TodosStore} from './todos.store';

@Injectable({
  providedIn: 'root'
})
export class TodosQuery extends QueryEntity<TodosState, Todo> {

  selectVisibilityFilter$ = this.select(state => state.ui.filter);

  selectVisibleTodos$ = combineLatest(
    this.selectVisibilityFilter$,
    this.selectAll(),
    this.getVisibleTodos
  );

  allCountTodos$ = this.selectCount();
  activeCountTodos$ = this.selectCount(entity => entity.completed);
  completedCountTodos$ = this.selectCount(entity => !entity.completed);

  constructor(protected store: TodosStore) {
    super(store);
  }

  private getVisibleTodos(filter: VISIBILITY_FILTER, todos: Todo[]): Todo[] {
    const filterTodos = {
      [VISIBILITY_FILTER.SHOW_COMPLETED]: (todo: Todo[]) => todo.filter(t => t.completed),
      [VISIBILITY_FILTER.SHOW_ACTIVE]: (todo: Todo[]) => todo.filter(t => !t.completed),
      default: (todo: Todo[]) => todo,
    };
    return (filterTodos[filter] || filterTodos.default)(todos);
  }
}
