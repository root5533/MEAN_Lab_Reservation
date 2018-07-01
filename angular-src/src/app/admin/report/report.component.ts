import { Component, OnInit } from '@angular/core';
import { BackEndService } from "../../services/back-end.service";
import * as jsPDF from 'jspdf'
import 'jspdf-autotable';


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
    const left = 40;
    const vertical_gap = 20;
    const up = 50;
    var columns = ["ID", "Name", "Country"];
    var rows = [
      [1, "Shaw", "Tanzania"],
      [2, "Nelson", "Kazakhstan"],
      [3, "Garcia", "Madagascar"]
    ];
    this.pdf = new jsPDF('p', 'pt');
    this.pdf.autoTable(columns, rows, {
      margin: { top: 100 }
    });
    this.pdf.setFontSize(14);
    this.pdf.text('Report - ADMTC Lab', left, up + vertical_gap * 0);
    this.pdf.setFontSize(9);
    this.pdf.text('From: 7/1/2018', left, up + vertical_gap * 1);
    this.pdf.text('To: 8/1/2018', left, up + vertical_gap * 1.8);
    this.pdf.save('report_admtc_lab_7/1/2018_8/1/2018.pdf');
  }

}
