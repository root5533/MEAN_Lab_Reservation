import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { BackEndService } from '../../services/back-end.service';
import { LabService } from '../../services/lab.service';
import { Observable, Subject } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter,
NgbModal, ModalDismissReasons, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ReservationFormModalComponent } from '../reservation-form-modal/reservation-form-modal.component';
import { ScrollService } from '../../services/scroll.service';
import { EventService } from '../../services/event.service';
import * as Moment from 'moment';


const now = new Date();

const colors: any = {
  purple: {
    primary: '#FAFAFA',
    secondary: '#673AB7'
  },
  red: {
    primary: '#FAFAFA',
    secondary: '#F44336'
  }
};

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}],
  animations: [
    trigger('openingAnimation', [
      state('active', style({
        display: 'block',
        opacity: 1
      })),
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      transition('active <=> inactive', animate('400ms ease'))
    ])
  ]
})

export class EventCalendarComponent implements OnInit {

  _selectedLab: Observable<any>;
  selectedLab: any;
  events: any;
  eventObservable: Observable<any>;
  opening: String;
  user: any;

  date: {year: number, month: number};
  model: NgbDateStruct;

  viewDate = new Date();
  monday: Date;
  tuesday: Date;
  wednesday: Date;
  thursday: Date;
  friday: Date;
  saturday: Date;
  sunday: Date;


  refresh: Subject<any> = new Subject();
  eventsCalendar: CalendarEvent[] = [];

  closeResult: String;
  reservationForm: FormGroup;

  constructor( private backend: BackEndService, private labService: LabService,
    private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder,
    public dialog: MatDialog, private scrollService: ScrollService, private eventService: EventService ) {

      const time: NgbTimeStruct = {hour: 0, minute: 0, second: 0};

      this.reservationForm = fb.group({
        'title': [null, Validators.compose([Validators.required])],
        'description': [null],
        'date': [null, Validators.compose([Validators.required])],
        // 'start_hour': [null, Validators.compose([Validators.required])],
        // 'start_minute': [null, Validators.compose([Validators.required])],
        'start_time': [time],
        'end_time': [time],
        // 'end_hour': [null, Validators.compose([Validators.required])],
        // 'end_minute': [null, Validators.compose([Validators.required])]
      });

    }

  ngOnInit() {
    this.opening = 'inactive';
    this._selectedLab = this.labService.getSelectedLab;
    this.selectedLab = this.labService.getCurrentLab;
    this.eventObservable = this.eventService.getEventObservable;
    if (this.selectedLab !== null) {
      this.loadEvents();
    }
    if (this.selectedLab !== null) {
      this.loadEvents();
    }
    this._selectedLab.subscribe((lab) => {
      this.selectedLab = lab;
      if (this.selectedLab !== null) {
        this.loadEvents();
      }
    });
    this.auth.getProfile().subscribe((res) => {
      this.user = res['user'];
    });
    this.eventObservable.subscribe((res) => {
      if (res && this.selectedLab !== null) {
        this.loadEvents();
      }
    });

    this.setCalendarDays();

  }

  loadEvents() {
    this.opening = 'active';
    this.backend.getEventsFromLab(this.selectedLab._id).subscribe((events) => {
      this.events = events['data'];
      this.eventsCalendar = [];
      for (let i = 0; i < this.events.length; i++) {
        let color: any;
        if (this.events[i].user_id === this.user['_id']) {
          color = colors.purple;
        } else {
          color = colors.red;
        }
        this.eventsCalendar.push({
          start: new Date(this.events[i].start),
          end: new Date(this.events[i].end),
          title: this.events[i].title,
          color: color,
          cssClass: 'event-class'
        });
      }
    });
  }

  handleEvent(action: String, event: CalendarEvent) {
    // console.log(action, event);
  }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: {month: number}) {
    return date.month !== current.month;
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${reason}`;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReservationFormModalComponent, {
      width: '40%',
      minWidth: '400px',
      data: { name: this.user.name, lab: this.selectedLab }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.viewDate = result;
      }
    });
  }

  getMonday(d) {
    d = new Date(d);
    const day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  private setCalendarDays() {
    this.monday = this.getMonday(this.viewDate);
    this.tuesday = Moment(this.monday).add(1, 'days').toDate();
    this.wednesday = Moment(this.monday).add(2, 'days').toDate();
    this.thursday = Moment(this.monday).add(3, 'days').toDate();
    this.friday = Moment(this.monday).add(4, 'days').toDate();
    this.saturday = Moment(this.monday).add(5, 'days').toDate();
    this.sunday = Moment(this.monday).add(6, 'days').toDate();
    // console.log(this.sunday);
    this.refresh.next();
  }

  dateChange() {
    this.setCalendarDays();
  }

}
