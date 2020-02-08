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
    this.getVisibleTodos.bind(this)
  );

  allCountTodos$ = this.selectCount();
  activeCountTodos$ = this.selectCount(entity => entity.completed);
  completedCountTodos$ = this.selectCount(entity => !entity.completed);

  private filterTodos = {
    [VISIBILITY_FILTER.SHOW_COMPLETED]: (todos: Todo[]) => todos.filter(t => t.completed),
    [VISIBILITY_FILTER.SHOW_ACTIVE]: (todos: Todo[]) => todos.filter(t => !t.completed),
    default: (todos: Todo[]) => todos,
  };

  constructor(protected store: TodosStore) {
    super(store);
  }

  private getVisibleTodos(filter: VISIBILITY_FILTER, todos: Todo[]): Todo[] {
    return (this.filterTodos[filter] || this.filterTodos.default)(todos);
  }
}
