import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AccountRoutingModule, routedComponents } from './account-routing.module';

@NgModule({
  declarations: [routedComponents],
  imports: [
    CommonModule,
    RouterModule,
    AccountRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class AccountModule { }
