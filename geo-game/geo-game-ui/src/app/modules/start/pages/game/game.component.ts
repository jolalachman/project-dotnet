import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { CountriesData, FeatureData, GameStatsModel, ScoreApiModel } from '@shared/models';
import { MapFacade } from '@shared/store/map';
import { BehaviorSubject, tap } from 'rxjs';
import { faCirclePause, faCirclePlay, faCircleQuestion, faCircleStop } from '@fortawesome/free-solid-svg-icons';
import { TimerComponent } from '@shared/components/timer/timer.component';
import { UserFacade } from '@shared/store/user';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnDestroy {
  @ViewChild(TimerComponent) timerComponent: TimerComponent | undefined;
  private facade = inject(MapFacade);
  private userFacade = inject(UserFacade);
  startTime = 900;
  countryInput: string = '';
  showError = false;
  loading = false;
  showMissing = false;
  showDialog = false;
  gamePaused = true;
  gameStats: GameStatsModel = {
    guessedCountries: '',
    time: 0,
    gameDate: null as any,
  };
  bestScore?: ScoreApiModel;

  tooltipText = 'Name as many countries as you can.\nUse the common, English name.\nMap can be zoomed and dragged.';

  icons = { faCirclePause, faCirclePlay, faCircleQuestion, faCircleStop };

  coloredCountries$ = this.facade.coloredCountries$;
  guessedCountries$ = this.facade.guessedCountries$.pipe(tap(x => {
    const arr = x.split('/');
    if (arr[0] === arr[1]) {
      this.onGameEnd(x);
    }
  }));

  ngOnDestroy(): void {
    this.facade.resetGuessedCountries();
  }

  updateInput(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.checkCountry(this.countryInput);
      this.countryInput = '';
    }
  }

  onGameEnd(guessedCountries: string) {
    this.gamePaused = true;
    const time = this.startTime - (this.timerComponent?.startTime ?? 0);
    this.gameStats = {
      guessedCountries,
      time,
      gameDate: new Date(),
    }

    if(this.userFacade.isAuthenticated) {
      this.userFacade.saveScore(this.gameStats).subscribe(x => {
        this.bestScore = x;
        this.showDialog = true;
      });
    }
    else {
      this.showDialog = true;
    }
  }

  pauseGame(pause: boolean){
    this.gamePaused = pause;
  }

  private checkCountry(countryName: string) {
    this.showError = false;
    this.loading = true;
    this.facade.mapData$.pipe(tap((data: CountriesData) => {
      this.loading = false;
        const foundCountry = data.features.find(x => x.properties.name.toLowerCase() === countryName.toLowerCase())
        if (foundCountry) {
          this.facade.loadColoredCountry(foundCountry)
        }
        else {
          this.showError = true;
        }
    })).subscribe();
  }

  showMissingCountries() {
    this.showMissing = true;
  }

  hideMissingCountries() {
    this.showMissing = false;
  }

  handleGameEnded() {
    this.showDialog = false;
    this.showMissing = false;
    if(this.timerComponent) {
      this.timerComponent.startTime = 900;
    }
    this.facade.resetGuessedCountries();
    this.countryInput = '';
    this.showError = false;
    this.loading = false;
    this.gameStats = {
      guessedCountries: '',
      time: 0,
      gameDate: null as any,
    };
    this.bestScore = undefined;
  }
}
