import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-lab-reservation',
  templateUrl: './lab-reservation.component.html',
  styleUrls: ['./lab-reservation.component.scss']
})
export class LabReservationComponent implements OnInit {

  constructor( private scrollService: ScrollService ) { }

  ngOnInit() {
  }

}
