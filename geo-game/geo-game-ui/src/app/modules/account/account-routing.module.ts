import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyAccountComponent } from './pages';
import { ConfirmationComponent } from './pages/my-account/components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MyAccountComponent,
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
export class AccountRoutingModule {}

export const routedComponents = [MyAccountComponent, ConfirmationComponent];
