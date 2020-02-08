import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-todo-form',
  template: `
    <div class="input-field">
      <i class="material-icons prefix">add_circle_outline</i>
      <input
        #input
        type="text"
        class="form-control"
        placeholder="Add Todo..."
        (keydown.enter)="add(input)"
      >
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent {

  @Output()
  addTodo = new EventEmitter<string>();

  add(input: HTMLInputElement): void {
    this.addTodo.emit(input.value);
    input.value = '';
  }
}
