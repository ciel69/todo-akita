import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container padding">
      <app-todos-info></app-todos-info>
      <app-todo></app-todo>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
