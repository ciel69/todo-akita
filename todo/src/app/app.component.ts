import {Component, ViewChild} from '@angular/core';

import {TodoComponent} from '@/components/todo/todo.component';

@Component({
  selector: 'app-root',
  template: `
    <div class="container padding">
      <app-todos-info [todos]="todoComponent?.todos || []"></app-todos-info>
      <app-todo></app-todo>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {

  @ViewChild(TodoComponent, {static: false})
  todoComponent: TodoComponent;

}
