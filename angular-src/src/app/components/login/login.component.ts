import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private routes: Router, private flashMessage: FlashMessagesService) {
    this.loginForm = fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    if (this.auth.userAvailable) {
      this.flashMessage.show('You\'ve already logged in', {cssClass: 'alert-info', timeout: 3000});
      this.routes.navigateByUrl('');
    }
  }

  loginUser(value) {
    const user = {
      'username': value.username,
      'password': value.password
    };
    this.auth.loginUser(user).subscribe((res) => {
      if (res['success']) {
        this.auth.storeUserData(res['token'], res['user']);
        this.flashMessage.show('You\'ve successfully logged in', {cssClass: 'alert-success', timeout: 5000});
        this.routes.navigateByUrl('');
      } else {
        this.flashMessage.show(res['msg'], {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

}
