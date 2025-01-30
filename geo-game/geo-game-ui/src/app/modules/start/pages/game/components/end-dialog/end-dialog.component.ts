import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { GameStatsModel, ScoreApiModel } from '@shared/models';

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrl: './end-dialog.component.scss'
})
export class EndDialogComponent {
  @Input() gameStats: GameStatsModel = {
    guessedCountries: '',
    time: 0,
    gameDate: null as any,
  }

  @Output() gameEnded: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() bestScore?: ScoreApiModel;

  continue() {
    this.gameEnded.emit(true);
  }
}
