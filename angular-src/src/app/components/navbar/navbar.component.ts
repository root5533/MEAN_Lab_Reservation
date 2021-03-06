import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user;

  constructor(private auth: AuthService, private flashmessage: FlashMessagesService, private routes: Router) { }

  ngOnInit() {
    this.user = this.auth.userAvailable;
    this.auth.userVisibilityChange.subscribe((value) => {
      this.user = value;
    });
  }

  onLogoutClick() {
    this.auth.logOut();
    this.routes.navigateByUrl('home');
    return false;
  }

}
