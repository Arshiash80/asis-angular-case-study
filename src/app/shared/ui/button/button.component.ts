import { Component, signal } from "@angular/core";

@Component({
  selector: 'app-button',
  template: `
    <button (click)="onClick()">
    <ng-content></ng-content>
    {{ isClicked() ? 'Not Clicked' : 'Clicked' }}
  </button>
  `,
  styles: [
    `
    button {
      background-color: red;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
    }
    `
  ]
})

export class ButtonComponent {
  isClicked = signal(false)

  onClick = () => {
    this.isClicked.update(isClicked => !isClicked)
  }
}