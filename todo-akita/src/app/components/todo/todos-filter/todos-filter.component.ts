import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {action} from '@datorama/akita';

import {TodoFilter, VISIBILITY_FILTER} from '@/model/filter.model';
import {TodosService} from '@/store/todos/todos.service';

@Component({
  selector: 'app-todos-filters',
  template: `
    <div class="input-field col s12">
      <select [formControl]="control" class="browser-default">
        <option
          *ngFor="let filter of filters;"
          [ngValue]="filter.value"
        >
          {{filter.label}}
        </option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosFiltersComponent implements OnInit, OnDestroy {

  @Input()
  active: VISIBILITY_FILTER;

  @Input()
  filters: TodoFilter[];

  @Output()
  update = new EventEmitter<VISIBILITY_FILTER>();

  control: FormControl;

  constructor(
    private todosService: TodosService
  ) {
  }


  ngOnInit(): void {
    this.control = new FormControl(this.active);

    this.control.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(c => {
        // this.updateFilter(c);
        this.update.emit(c);
      });
  }

  ngOnDestroy(): void {
  }

  @action('TodosFilters Update filter')
  updateFilter(filter): void {
    this.todosService.updateFilter(filter);
  }
}
