import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LabReservationComponent } from './reservation/lab-reservation/lab-reservation.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ComponentsComponent } from './components/components.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UcscLabsComponent } from './admin/ucsc-labs/ucsc-labs.component';
import { UsersComponent } from './admin/users/users.component';
import { LabReservationsComponent } from './admin/lab-reservations/lab-reservations.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: ComponentsComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'reservation', component: LabReservationComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent,
    children: [
      {path: 'login', component: AdminLoginComponent},
      {path: '', component: AdminDashboardComponent, canActivate: [AdminGuard]},
      {path: 'ucsc_labs', component: UcscLabsComponent, canActivate: [AdminGuard]},
      {path: 'user_reservations', component: LabReservationsComponent, canActivate: [AdminGuard]},
      {path: 'users', component: UsersComponent, canActivate: [AdminGuard]}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
