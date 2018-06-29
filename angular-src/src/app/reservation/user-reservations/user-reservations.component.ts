import { Component, OnInit } from '@angular/core';
import { LabService } from '../../services/lab.service';
import { Observable } from 'rxjs';
import { BackEndService } from '../../services/back-end.service';
import { ScrollService } from '../../services/scroll.service';
import { EventService } from '../../services/event.service';
import { MatDialog } from '@angular/material';
import { ReservationFormModalComponent } from '../reservation-form-modal/reservation-form-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent implements OnInit {

  selectedLab: any;
  _selectedLab: Observable<any>;
  events: any;
  eventsObservable: Observable<any>;
  user: any;

  constructor( private labService: LabService, private backend: BackEndService, private scrollService: ScrollService,
    private eventService: EventService, public dialog: MatDialog, private auth: AuthService ) { }

  ngOnInit() {

    this._selectedLab = this.labService.getSelectedLab;
    this.selectedLab = this.labService.getCurrentLab;
    this.eventsObservable = this.eventService.getEventObservable;
    this._selectedLab.subscribe((lab) => {
      this.selectedLab = lab;
      if (this.selectedLab !== null) {
        this.loadUserEvents();
      }
    });
    this.eventsObservable.subscribe((res) => {
      if (res && this.selectedLab !== null) {
        this.loadUserEvents();
      }
    });
    this.auth.getProfile().subscribe((res) => {
      this.user = res['user'];
    });
  }

  loadUserEvents() {
    this.backend.getUserEventsFromLab(this.selectedLab._id).subscribe((res) => {
      this.events = res['data'];
    });
  }

  updateReservation(event) {
    const dialogRef = this.dialog.open(ReservationFormModalComponent, {
      width: '40%',
      minWidth: '400px',
      data: { name: this.user.name, lab: this.selectedLab, event: event }
    });
  }

}
