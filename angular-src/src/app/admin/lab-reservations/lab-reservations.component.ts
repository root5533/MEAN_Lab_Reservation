import { Component, OnInit, ViewChild } from '@angular/core';
import { BackEndService } from "../../services/back-end.service";
import { MatSnackBar } from '@angular/material';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lab-reservations',
  templateUrl: './lab-reservations.component.html',
  styleUrls: ['./lab-reservations.component.scss']
})
export class LabReservationsComponent implements OnInit {

  reservations: any;
  selectedDate: Date;
  selectedLab: any;
  labs: any;
  selectedReservation: any;
  overlayValue: boolean;

  @ViewChild('delete_lab') public popover: NgbPopover;

  constructor( private backend: BackEndService, public snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.backend.getLabs().subscribe((res) => {
      if (res) {
        this.labs = res['labs'];
      }
    })
  }

  search() {
    this.reservations = null;
    const data = {
      event_date: this.selectedDate,
      lab_id: this.selectedLab
    }
    this.backend.getEventsFromDate(data).subscribe((res) => {
      if (res['success']) {
        if (res['data'].length > 0) {
          this.reservations = res['data'];
          this.openSnackBar('Received new data', 'UPDATE');
        }
      } else {
        this.openSnackBar('Unable to complete the search', 'FAILED');
      }
    })
  }

  eventSelect(event) {
    if (event._id === this.selectedReservation) {
      this.selectedReservation = null;
    } else {
      this.selectedReservation = event._id;
    }
  }

  overlay(value) {
    this.overlayValue = value;
  }

  popoverClose() {
    this.popover.close();
  }

  deleteReservation() {
    this.backend.deleteReservation(this.selectedReservation).subscribe((res) => {
      if (res['success']) {
        this.openSnackBar(res['msg'], 'DELETE');
        this.popoverClose();
        this.search();
        this.selectedReservation = null;
      } else {
        this.openSnackBar(res['msg'], 'FAILED');
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
