import { Component, OnInit } from '@angular/core';
import { LabService } from '../../services/lab.service';
import { CalendarEventsService } from '../../services/calendar-events.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss']
})
export class LabComponent implements OnInit {

  // currentLab: Observable<any>;
  labs: any;
  selectedLab: any;

  constructor( private labService: LabService, private calendarService: CalendarEventsService ) { }

  ngOnInit() {
    this.calendarService.getLabs().subscribe((res) => {
      this.labs = res['labs'];
    });
  }

  clickLab(lab) {
    this.selectedLab = lab;
    this.labService.labChange(lab);
  }

}
