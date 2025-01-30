import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})
export class ConfirmationComponent {
  @Output() continueo: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancelo: EventEmitter<boolean> = new EventEmitter<boolean>();

  continue() {
    this.continueo.emit(true);
  }

  cancel() {
    this.cancelo.emit(true);
  }
}
