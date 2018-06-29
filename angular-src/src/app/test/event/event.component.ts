import { Component, OnInit } from '@angular/core';
import { LabService } from '../../services/lab.service';
import { Observable } from 'rxjs';
import { CalendarEventsService } from '../../services/calendar-events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  currentLab: Observable<any>;
  _currentLab: any;
  events: any;

  constructor( private labService: LabService, private calendarService: CalendarEventsService ) { }

  ngOnInit() {
    this.currentLab = this.labService.getSelectedLab;
    this.currentLab.subscribe((res) => {
      console.log('currentLab value : ', res);
      if (res !== null) {
        this._currentLab = res;
        this.getEvents(res);
      }
    });
  }

  private getEvents(lab) {
    this.calendarService.getEventsFromLab(lab._id).subscribe((res) => {
      this.events = res['data'];
    });
  }

}
