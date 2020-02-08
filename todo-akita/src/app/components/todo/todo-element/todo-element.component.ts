import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ID} from '@datorama/akita';
import {untilDestroyed} from 'ngx-take-until-destroy';

import {Todo} from '@/model/todo.model';

@Component({
  selector: 'app-todo-element',
  template: `
    <div class="flex align-center sb todo-element">
      <div class="flex">
        <label>
          <input type="checkbox" [formControl]="control"/>
          <span></span>
        </label>
        {{todo.title}}
      </div>
      <a class="btn waves-effect waves-light red btn-small btn-floating">
        <i class="material-icons" (click)="delete.emit(todo.id)">delete_forever</i>
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoElementComponent implements OnInit, OnDestroy {

  @Input()
  todo: Todo;

  @Output()
  complete = new EventEmitter<Todo>();

  @Output()
  delete = new EventEmitter<ID>();

  control: FormControl;

  ngOnInit(): void {
    this.control = new FormControl(this.todo.completed);

    this.control.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((completed: boolean) => {
        this.complete.emit({...this.todo, completed});
      });
  }

  ngOnDestroy(): void {
  }
}
