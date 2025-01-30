import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { sharedComponents } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { pipes } from './pipes';
import { directives } from './directives';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [
    sharedComponents,
    pipes,
    directives
  ],
  exports: [
    sharedComponents,
    pipes,
    directives,
    FontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
})
export class SharedModule { }
