import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: Object;

  constructor( private auth: AuthService ) { }

  ngOnInit() {
    this.user = this.auth.getProfile().subscribe((res) => {
      this.user = res['user'];
    });
  }

}
