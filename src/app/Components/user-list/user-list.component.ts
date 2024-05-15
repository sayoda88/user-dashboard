import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { User } from 'src/app/Models/user';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages!: number;
  isLoading = false;
  searchTerm = '';
  searchTermSubject = new Subject<string>();

  constructor(private http: HttpClient, private _Router: Router) {}

  ngOnInit() {
    this.getUsers(this.currentPage);

    this.searchTermSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(term => this.searchTerm = term)
    ).subscribe(() => this.getUsers(1));
  }

  getUsers(page: number) {
    this.isLoading = true;
    const url = `https://reqres.in/api/users?page=${page}`;
    this.http.get<any>(url)
      .pipe(
        tap(response => {
          this.users = response.data;
          console.log(this.users);
          
          this.totalPages = response.total_pages;
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  onPageChange(event: { page: number }) {
    this.currentPage = event.page + 1;
    this.getUsers(this.currentPage);
  }
  navigateToUserDetails(userId: number) {
    this._Router.navigate(['users', userId]);
  }
  onSearchTermChange(term: string) {
    this.searchTermSubject.next(term);
  }
}
