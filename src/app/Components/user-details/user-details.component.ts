import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/Models/user';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any | null = null;
  isLoading = false;
error=false;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      const url = `https://reqres.in/api/users/${userId}`;
      this.http.get<User>(url)
        .pipe(
          tap(data => {
            this.user = data;
        
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }
}
