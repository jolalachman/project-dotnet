import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleEnum } from '@shared/enum';
import { UserService } from '@shared/services';
import { UserFacade } from '@shared/store/user';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private facade = inject(UserFacade);
  public UserRoleEnum = UserRoleEnum;
  role$ = this.facade.role$;

  constructor(private router: Router){}
  
  goTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this.facade.logout();
  }
}
