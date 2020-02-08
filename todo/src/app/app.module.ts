import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {TodoElementComponent} from '@/components/todo/todo-element/todo-element.component';
import {TodosComponent} from '@/components/todo/todos/todos.component';
import {TodoFormComponent} from '@/components/todo/todo-form/todo-form.component';
import {TodosFilterComponent} from '@/components/todo/todos-filter/todos-filter.component';
import {TodoComponent} from '@/components/todo/todo.component';
import {TodosInfoComponent} from '@/components/todos-info/todos-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoElementComponent,
    TodosComponent,
    TodoFormComponent,
    TodosFilterComponent,
    TodosInfoComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
