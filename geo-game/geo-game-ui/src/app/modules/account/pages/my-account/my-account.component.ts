import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fa0, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserRoleEnum } from '@shared/enum';
import { ScoreApiModel } from '@shared/models';
import { loadData } from '@shared/store/map/map.actions';
import { UserFacade } from '@shared/store/user';
import { switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements AfterViewInit {
  private facade = inject(UserFacade);
  user$ = this.facade.getUserInfo();

  displayedColumns: string[] = ['gameDate', 'gameTime', 'guessedCountries'];
  dataSource = new MatTableDataSource<ScoreApiModel>([]);
  public UserRoleEnum = UserRoleEnum;
  faTrash = faTrash;
  showConfirmationDialog = false;

  pageIndex = 0;
  pageSize = 5;
  totalItems = 0;
  sortOptions: Sort = {
    active: '',
    direction: '',
  }

  ngAfterViewInit() {
    this.loadPageData().subscribe();
  }

  loadPageData() {
    return this.facade.getUserScores(this.pageIndex, this.pageSize, this.sortOptions).pipe(
      tap((scores) => {
        this.dataSource.data = scores.data;
        this.totalItems = scores.totalCount;
      })
    );
  }

  mapDate(dateString: string) {
    return new Date(dateString);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.loadPageData().subscribe();
  }

  handleSort(event: Sort) {
    this.sortOptions = event;
    this.loadPageData().subscribe();
  }

  deleteScoreHistory() {
    this.facade.deleteUserScores().pipe(
      switchMap(x => this.loadPageData())
    ).subscribe();
  }

  deleteAccount() {
    this.facade.deleteUserAccount().subscribe(x => this.facade.logout());
  }
}
