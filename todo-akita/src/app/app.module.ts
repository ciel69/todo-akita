import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from '../environments/environment';
import {TodoElementComponent} from '@/components/todo/todo-element/todo-element.component';
import {TodoComponent} from '@/components/todo/todo.component';
import {TodoFormComponent} from '@/components/todo/todo-form/todo-form.component';
import {TodosFiltersComponent} from '@/components/todo/todos-filter/todos-filter.component';
import {TodosComponent} from '@/components/todo/todos/todos.component';
import {ReactiveFormsModule} from '@angular/forms';
import {TodosInfoComponent} from '@/components/todos-info/todos-info.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodosComponent,
    TodoFormComponent,
    TodosFiltersComponent,
    TodoElementComponent,
    TodosInfoComponent,
  ],
  imports: [
    BrowserModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
