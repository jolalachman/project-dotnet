import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header';
import { DefaultLayoutComponent } from './layouts';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    GoogleSigninButtonModule,
  ],
  declarations: [
    HeaderComponent,
    DefaultLayoutComponent
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class LayoutModule { }
