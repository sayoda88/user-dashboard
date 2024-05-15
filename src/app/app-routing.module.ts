import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { UserListComponent } from './Components/user-list/user-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
