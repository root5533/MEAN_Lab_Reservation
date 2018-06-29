import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message: String;

  constructor(private fb: FormBuilder, private auth: AuthService, private routes: Router, private flashMessage: FlashMessagesService) {
    this.registerForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
  }

  onRegisterSubmit(value) {
    this.message = '';
    const response = {};
    const user = {
      'name': value.name,
      'username': value.username,
      'email': value.email,
      'password': value.password
    };
    this.auth.registerUser(user).then((res) => {
      if (res['success']) {
        this.flashMessage.show('You have been successfully registered', {cssClass: 'custom-alert-success', timeout: 5000});
        this.routes.navigateByUrl('login');
      } else {
        this.flashMessage.show('A problem has occured!', {cssClass: 'custom-alert-danger', timeout: 5000});
      }
    });
  }

}
