import { Component, OnInit } from '@angular/core';
import { BackEndService } from "../../services/back-end.service";
import * as Moment from "moment";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  labs: any;
  events: any;
  currentDate = new Date();

  constructor( private backend: BackEndService) { }

  ngOnInit() {

    this.backend.getLabs().subscribe((res) => {
      if (res) {
        this.labs = res['labs'];
      }
    });

    this.backend.getAllEventsToday().subscribe((res) => {
      if (res['success']) {
        console.log(res);
        this.events = res['events'];
        this.events.sort( (a, b) => {
          const c = Moment(a.start);
          const d = Moment(b.start);
          return d.diff(c);
        });
        this.events.reverse();
      }
    })

  }

}
