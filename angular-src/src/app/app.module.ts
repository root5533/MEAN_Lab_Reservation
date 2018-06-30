import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppRoutingModule } from './/app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { LabComponent } from './test/lab/lab.component';
import { EventComponent } from './test/event/event.component';
import { ParentComponent } from './test/parent/parent.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CalendarComponent } from './components/calendar/calendar.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { LabService } from './services/lab.service';
import { CalendarEventsService } from './services/calendar-events.service';
import { LabReservationComponent } from './reservation/lab-reservation/lab-reservation.component';
import { LabSelectComponent } from './reservation/lab-select/lab-select.component';
import { EventCalendarComponent } from './reservation/event-calendar/event-calendar.component';
import { UserReservationsComponent } from './reservation/user-reservations/user-reservations.component';

import { MatButtonModule, MatMenuModule, MatFormFieldModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MatDialogModule, MatSnackBarModule, MatCardModule } from '@angular/material';
import { ReservationFormModalComponent } from './reservation/reservation-form-modal/reservation-form-modal.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ComponentsComponent } from './components/components.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';

import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { UcscLabsComponent } from './admin/ucsc-labs/ucsc-labs.component';
import { LabReservationsComponent } from './admin/lab-reservations/lab-reservations.component';
import { UsersComponent } from './admin/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    CalendarComponent,
    LabComponent,
    EventComponent,
    ParentComponent,
    LabReservationComponent,
    LabSelectComponent,
    EventCalendarComponent,
    UserReservationsComponent,
    ReservationFormModalComponent,
    AdminComponent,
    AdminLoginComponent,
    ComponentsComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    UcscLabsComponent,
    LabReservationsComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    NgbModule.forRoot(),
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    ScrollToModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, LabService, CalendarEventsService, AdminGuard],
  bootstrap: [AppComponent],
  entryComponents: [ReservationFormModalComponent]
})
export class AppModule { }
