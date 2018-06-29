import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackEndService } from '../../services/back-end.service';
import { EventService } from '../../services/event.service';
import { Observable } from 'rxjs';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';


@Component({
  selector: 'app-reservation-form-modal',
  templateUrl: './reservation-form-modal.component.html',
  styleUrls: ['./reservation-form-modal.component.scss']
})
export class ReservationFormModalComponent implements OnInit {

  reservationForm: FormGroup;
  now = {
    hour: 7,
    minute: 0
  };
  isUpdate = false;
  updateEventId: String;
  modalTitle: String;
  eventValidateError: String;
  canSubmit = false;
  errorObservable: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<ReservationFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private backend: BackEndService,
    public snackBar: MatSnackBar,
    private eventService: EventService
  ) {
    this.reservationForm = fb.group({
      'title': [null, Validators.compose([Validators.required])],
      'description': [null],
      'date': [null, Validators.compose([Validators.required])],
      'start_time': [this.now, Validators.compose([Validators.required])],
      'end_time': [this.now, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    if (this.data['event']) {
      this.isUpdate = true;
      this.updateEventId = this.data['event']['_id'];
      const start = new Date(this.data['event']['start']);
      const start_time = {
        hour: start.getHours(),
        minute: start.getMinutes()
      };
      const end = new Date(this.data['event']['end']);
      const end_time = {
        hour: end.getHours(),
        minute: end.getMinutes()
      };
      const setEvent = {
        title: this.data['event']['title'],
        description: this.data['event']['description'],
        date: this.data['event']['start'],
        start_time: start_time,
        end_time: end_time
      };
      this.reservationForm.setValue(setEvent);
      this.reservationForm.patchValue(setEvent);
      this.modalTitle = 'Update Reservation';
    } else {
      this.modalTitle = 'New Reservation';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  addReservation(value) {
    this.eventValidateError = null;
    const startDate = new Date(value.date);
    startDate.setHours(value.start_time.hour);
    startDate.setMinutes(value.start_time.minute);
    const endDate = new Date(value.date);
    endDate.setHours(value.end_time.hour);
    endDate.setMinutes(value.end_time.minute);
    const reservation = {
      title: value.title,
      description: value.description,
      start: startDate,
      end: endDate,
      lab_id: this.data.lab._id,
    };
    this.validateEvent(startDate, endDate, this.data['lab']['_id'], reservation);
    // if (result) {
      // this.backend.addNewReservation(reservation).subscribe((res) => {
      //   if (res['success'] === false) {
      //     this.openSnackBar(res['msg'], '');
      //   } else {
      //     this.eventService.eventChange();
      //     this.openSnackBar(res['msg'], 'NEW');
      //     this.close();
      //   }
      // });
    // }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  deleteReservation() {
    const id = this.updateEventId;
    this.backend.deleteReservation(id).subscribe((res) => {
      if (res['success'] === false) {
        this.openSnackBar(res['msg'], '');
      } else {
        this.eventService.eventChange();
        this.openSnackBar(res['msg'], 'DELETE');
        this.close();
      }
    });
  }

  updateReservation(value) {
    const startDate = new Date(value.date);
    startDate.setHours(value.start_time.hour);
    startDate.setMinutes(value.start_time.minute);
    const endDate = new Date(value.date);
    endDate.setHours(value.end_time.hour);
    endDate.setMinutes(value.end_time.minute);
    const reservation = {
      title: value.title,
      description: value.description,
      start: startDate,
      end: endDate,
      lab_id: this.data['event']['lab_id'],
      id: this.updateEventId
    };
    this.validateEvent(startDate, endDate, this.data['lab']['_id'], reservation);
  }

  validateEvent(start: Date, end: Date, lab_id: String, reservation): void {
    const moment = extendMoment(Moment);
    const year = start.getFullYear();
    const month = start.getMonth();
    const day = start.getDate();
    const date = new Date(year, month, day);
    const now = moment().startOf('day').toDate();

    if (start.getHours() < 7 || end.getHours() > 19) {
      this.eventValidateError = 'Reservations can be done during 7AM and 7PM only';
      return;
    }

    if (start < now) {
      this.eventValidateError = 'Reservations can only be done on today or a future date';
      return;
    }

    // const diff = Math.abs(end - start);
    // const minutes = Math.floor((diff / 1000) / 60);

    // if (minutes < 30) {
    //   this.eventValidateError = 'Reservations should have a minimum of 30 minutes';
    //   return;
    // }

    if (end < start) {
      this.eventValidateError = 'Invalid start and end time';
      return;
    }

    this.backend.getEventsFromDate({event_date: date, lab_id: lab_id}).subscribe((res) => {
      if (res['data'].length === 0) {
        this.eventValidateError = null;
      } else {
        const eventRange = moment.range(start, end);
        for (let i = 0; i < res['data'].length ; i++) {
          if (this.isUpdate) {
            if (res['data'][i]['_id'] === reservation.id) {
              continue;
            }
          }
          const itemStart = res['data'][i]['start'];
          const itemEnd = res['data'][i]['end'];
          const range = moment.range(itemStart, itemEnd);
          if (eventRange.overlaps(range)) {
            this.eventValidateError = 'Your current reservation overlaps with another. Please try a different time';
            return;
          }
        }
      }

      if (this.isUpdate) {
        this.backend.updateReservation(reservation).subscribe((res2) => {
          if (res2['success'] === false) {
            this.openSnackBar(res2['msg'], '');
          } else {
            this.eventService.eventChange();
            this.openSnackBar(res2['msg'], 'UPDATE');
            this.close();
          }
        });
      } else {
        this.backend.addNewReservation(reservation).subscribe((res2) => {
          if (res2['success'] === false) {
            this.openSnackBar(res2['msg'], '');
          } else {
            this.eventService.eventChange();
            this.openSnackBar(res2['msg'], 'NEW');
            this.close();
          }
        });
      }
    });
  }

}
