import { Component, OnInit } from '@angular/core';
import { BackEndService } from '../../services/back-end.service';
import { LabService } from '../../services/lab.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-lab-select',
  templateUrl: './lab-select.component.html',
  styleUrls: ['./lab-select.component.scss']
})
export class LabSelectComponent implements OnInit {

  labs: any;
  currentLab: String;

  constructor( private backend: BackEndService, private labService: LabService, private scrollService: ScrollService ) { }

  ngOnInit() {
    this.labService.labChange(null);
    this.backend.getLabs().subscribe((res) => {
      this.labs = res['labs'];
    });
  }

  labSelect(lab) {
    this.currentLab = lab._id;
    this.labService.labChange(lab);
    this.scrollService.triggerScrollToCalendar();
  }

}
