import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MapFacade } from '@shared/store/map';
import { Subscription, switchMap } from 'rxjs';
import { UserFacade } from '@shared/store/user/user.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutModule,
    SharedModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'geo-game-ui';
  roleSubscription = Subscription.EMPTY;
  authSubscription = Subscription.EMPTY;
  mapSubscription = Subscription.EMPTY;

  constructor(
    private mapFacade: MapFacade,
    private userFacade: UserFacade,
  ) {}

  ngOnInit() {
    this.roleSubscription = this.userFacade.getRole().subscribe();
    this.authSubscription = this.userFacade.login().subscribe();
    this.mapSubscription = this.mapFacade.loadData().subscribe();
  }

  ngOnDestroy(): void {
    this.roleSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
    this.mapSubscription.unsubscribe();
  }

}
