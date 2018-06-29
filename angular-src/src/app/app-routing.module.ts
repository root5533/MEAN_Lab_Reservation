import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AuthGuard } from './guards/auth.guard';
import { ParentComponent } from './test/parent/parent.component';

import { LabReservationComponent } from './reservation/lab-reservation/lab-reservation.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'reservation2', component: CalendarComponent, canActivate: [AuthGuard]},
  {path: 'reservation', component: LabReservationComponent, canActivate: [AuthGuard]},
  {path: 'test', component: ParentComponent }
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
