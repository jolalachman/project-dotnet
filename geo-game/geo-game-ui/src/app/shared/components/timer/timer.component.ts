import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() startTime = 0;
  @Input() paused = false;
  @Output() timerStopped: EventEmitter<boolean> = new EventEmitter<boolean>();
  private timerSubscription: Subscription | undefined;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if(this.startTime === 0) {
        this.timerStopped.emit(true);
        this.timerSubscription?.unsubscribe();
      }
      else {
        if(!this.paused) {
          this.startTime--;
        }
      }
    });
  }
}
