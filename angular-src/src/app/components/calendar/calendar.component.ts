import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEventsService } from '../../services/calendar-events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';

import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';

const colors: any = {
  green: {
    primary: '#009688',
    secondary: '#B2DFDB'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('labAnimation', [
      state('active', style({
        display: 'block',
        opacity: 1
      })),
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      transition('active <=> inactive', animate('200ms ease-out'))
    ]),
    trigger('eventAnimation', [
      state('active', style({
        display: 'none',
        opacity: 0
      })),
      state('inactive', style({
        display: 'block',
        opacity: 1
      })),
      transition('active <=> inactive', animate('200ms ease-in'))
    ])
  ]
})

export class CalendarComponent implements OnInit {

  labs: any;
  selectedLab: any;
  showLabs: String;
  showReservations: String;
  events: any;
  reservationForm: FormGroup;
  formTitle: String;
  isUpdate: boolean;
  updateEventId: String;
  user: Object;
  labSelect: String;

  viewDate = new Date();
  prevDate: Date;
  nextDate: Date;
  refresh: Subject<any> = new Subject();
  eventsCalendar: CalendarEvent[] = [];

  closeResult: string;
  modalReference: any;

  constructor( private calendarService: CalendarEventsService, private fb: FormBuilder, private flashmessage: FlashMessagesService,
    private auth: AuthService, private modalService: NgbModal ) {
    this.reservationForm = fb.group({
      'title': [null, Validators.compose([Validators.required])],
      'description': [null],
      'date': [null, Validators.compose([Validators.required])],
      'start_hour': [null, Validators.compose([Validators.required])],
      'start_minute': [null, Validators.compose([Validators.required])],
      'end_hour': [null, Validators.compose([Validators.required])],
      'end_minute': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.calendarService.getLabs().subscribe((res) => {
      this.labs = res['labs'];
    });
    this.auth.getProfile().subscribe((res) => {
      this.user = res['user'];
    });
    this.formTitle = 'Add New Reservation';
    this.showLabs = 'active';
    this.showReservations = 'inactive';
    this.setOtherDate();
    this.labSelect = 'Select Lab';

    // const now = Moment();
    // console.log('hello world', now.format());
    // console.log(now.add(7, 'days').format());

    // const moment = extendMoment(Moment);
    // const start = addHours(new Date(2012, 0, 15), 0);
    // const end   = addHours(new Date(2012, 0, 15), 4);
    // const start_2 = addHours(new Date(2012, 0, 15), 4);
    // const end_2   = addHours(new Date(2012, 0, 15), 6);
    // const range_1 = moment.range(start, end);
    // const range_2 = moment.range(start_2, end_2);
    // console.log('range 1', range_1);
    // console.log('range 2', range_2);
    // console.log('overlaps', range_1.overlaps(range_2));
  }

  selectLab(lab) {
    this.selectedLab = lab;
    this.getEvents();
    this.reservationForm.reset();
    this.formTitle = 'Add New Reservation';
    this.isUpdate = false;
    this.showLabs = 'inactive';
    this.showReservations = 'active';
    this.labSelect = lab.name;
  }

  getEvents() {
    this.calendarService.getEventsFromLab(this.selectedLab._id).subscribe((res) => {
      this.events = res['data'];
      this.eventsCalendar = [];
      for (let i = 0; i < this.events.length; i++) {
        let color: any;
        if (this.events[i].user_id === this.user['_id']) {
          color = colors.green;
        } else {
          color = colors.blue;
        }
        this.eventsCalendar.push({
          start: new Date(this.events[i].start),
          end: new Date(this.events[i].end),
          title: this.events[i].title,
          color: color,
        });
      }
      console.log(this.eventsCalendar);
    });
  }

  addReservation(value) {
    const startDate = new Date(value.date);
    startDate.setHours(value.start_hour);
    startDate.setMinutes(value.start_minute);
    const endDate = new Date(value.date);
    endDate.setHours(value.end_hour);
    endDate.setMinutes(value.end_minute);
    const reservation = {
      title: value.title,
      description: value.description,
      start: startDate,
      end: endDate,
      lab_id: this.selectedLab._id,
    };
    this.calendarService.addNewReservation(reservation).subscribe((res) => {
      if (res['success'] === false) {
        this.flashmessage.show(res['msg'], {cssClass: 'alert-danger', timeout: 5000});
      } else {
        this.flashmessage.show(res['msg'], {cssClass: 'alert-success', timeout: 5000});
        this.getEvents();
        this.reservationForm.reset();
      }
    });
  }

  updateForm(event) {
    this.isUpdate = true;
    this.updateEventId = event._id;
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const date = new Date();
    date.setFullYear(startDate.getFullYear());
    date.setMonth(startDate.getMonth());
    date.setDate(startDate.getDate());
    const setEvent = {
      title: event.title,
      description: event.description,
      date: date,
      start_hour: startDate.getHours(),
      start_minute: startDate.getMinutes(),
      end_hour: endDate.getHours(),
      end_minute: endDate.getMinutes()
    };
    this.reservationForm.setValue(setEvent);
    this.reservationForm.patchValue(setEvent);
    this.formTitle = 'Update your reservation';
    // for (let i = 0; i < this.labs.length; i++) {
    //   if (this.labs[i]['_id'] === event.lab_id) {
    //     this.selectedLab = this.labs[i];
    //     console.log(this.selectedLab);
    //   }
    // }
  }

  updateReservation(value) {
    const startDate = new Date(value.date);
    startDate.setHours(value.start_hour);
    startDate.setMinutes(value.start_minute);
    const endDate = new Date(value.date);
    endDate.setHours(value.end_hour);
    endDate.setMinutes(value.end_minute);
    const reservation = {
      title: value.title,
      description: value.description,
      start: startDate,
      end: endDate,
      lab_id: this.selectedLab._id,
      id: this.updateEventId
    };
    this.calendarService.updateReservation(reservation).subscribe((res) => {
      if (!res['success']) {
        this.flashmessage.show(res['msg'], {cssClass: 'alert-danger', timeout: 5000});
      } else {
        this.flashmessage.show(res['msg'], {cssClass: 'alert-success', timeout: 5000});
        this.getEvents();
        this.reservationForm.reset();
        this.formTitle = 'Add New Reservation';
      }
    });
  }

  deleteReservation(value) {
    const id = this.updateEventId;
    this.calendarService.deleteReservation(id).subscribe((res) => {
      if (res['success']) {
        this.flashmessage.show(res['msg'], {cssClass: 'alert-success', timeout: 5000});
      } else {
        this.flashmessage.show(res['msg'], {cssClass: 'alert-danger', timeout: 5000});
      }
    });
    this.getEvents();
    this.reservationForm.reset();
    this.formTitle = 'Add New Reservation';
    this.isUpdate = false;
  }

  toggleShowLabs() {
    this.showLabs = (this.showLabs === 'active' ? 'inactive' : 'active');
  }

  handleEvent(action: String, event: CalendarEvent) {
    console.log(event);
  }

  setOtherDate() {
    this.prevDate = subDays(this.viewDate, 1);
    this.nextDate = addDays(this.viewDate, 1);
  }

  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  close() {
    this.modalReference.close();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
