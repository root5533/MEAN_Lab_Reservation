import { Component, OnInit } from '@angular/core';
import { BackEndService } from "../../services/back-end.service";
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';
import {from} from "rxjs/index";
import * as Moment from 'moment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  pdf: any;
  labs: any;
  selectedLab: any;
  from: Date;
  to: Date;

  constructor( private backend: BackEndService) { }

  ngOnInit() {
    this.backend.getLabs().subscribe((res) => {
      if (res) {
        this.labs = res['labs'];
      }
    })
  }

  createPdf() {
    const data = {
      from: this.from,
      to: this.to,
      lab_id: this.selectedLab._id
    };

    this.backend.getEventsForReport(data).subscribe((res) => {
      if (res['success']) {
        const events = res['data'];
        // console.log(events);
        this.generateReport(events);
      }
    });
  }

  generateReport(events) {
    const left = 40;
    const vertical_gap = 20;
    const up = 50;

    const columns = [
      { title: "No", dataKey: 'no'},
      { title: "Title", dataKey: 'title'},
      { title: "Description", dataKey: 'desc'},
      { title: "Date", dataKey: 'date'},
      { title: "Time", dataKey: 'time'},
    ]
    const rows = [];

    events.sort( (a, b) => {
      const c = Moment(a.start);
      const d = Moment(b.start);
      return d.diff(c);
    });

    for (let i=0; i<events.length; i++) {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
      let date = new Date(events[i].start);
      const dateString = date.toLocaleDateString('en-US', options);
      const start = date.toLocaleTimeString();
      date = new Date(events[i].end);
      const end = date.toLocaleTimeString();
      const timeString = start + " - " + end;
      const event = {
        "no": i+1,
        "title": events[i].title,
        "desc": events[i].description,
        "date": dateString,
        "time": timeString
      }
      rows.push(event);
    }

    //report generation
    const labname = 'Report - ' + this.selectedLab.name;
    const fromdate = this.from.toLocaleDateString("en-US");
    const todate = this.to.toLocaleDateString("en-US");
    const reportname = 'report_' + this.selectedLab.name.replace(/ /g,"_").toLowerCase() + '_' + fromdate + '_' + todate;
    this.pdf = new jsPDF('p', 'pt');
    this.pdf.autoTable(columns, rows, {
      margin: { top: 100 },
      headerStyles: {fillColor: [103, 58, 183]}
    });
    this.pdf.setFontSize(14);
    this.pdf.text(labname, left, up + vertical_gap * 0);
    this.pdf.setFontSize(10);
    this.pdf.text('From: ' + fromdate, left, up + vertical_gap * 1);
    this.pdf.text('To: ' + todate, left, up + vertical_gap * 1.8);
    this.pdf.save(reportname);
  }

}
