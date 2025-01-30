import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { GameComponent, MainPageComponent } from './pages';
import { EndDialogComponent } from './pages/game/components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class StartRoutingModule {}

export const routedComponents = [MainPageComponent, GameComponent, EndDialogComponent];
