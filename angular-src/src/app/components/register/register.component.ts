import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidatorService } from "../../services/validator.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  message: String;

  constructor(private fb: FormBuilder, private auth: AuthService, private routes: Router, private flashMessage: FlashMessagesService,
              private validator: ValidatorService) {
    this.registerForm = fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3), this.validator.noWhitespaceValidator])],
      'university': [null, Validators.compose([Validators.required, this.validator.noWhitespaceValidator])],
      'degrees': [null],
      'contact': [null, Validators.compose([Validators.required, Validators.minLength(10), this.validator.noWhitespaceValidator])],
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3), this.validator.noWhitespaceValidator])],
      'email': [null, Validators.compose([Validators.required, Validators.email, this.validator.noWhitespaceValidator])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6), this.validator.noWhitespaceValidator])]
    });
  }

  ngOnInit() {
  }

  onRegisterSubmit(value) {
    this.message = '';
    const response = {};
    const user = {
      'name': value.name,
      'university': value.university,
      'degrees': value.degrees,
      'contact': value.contact,
      'username': value.username,
      'email': value.email,
      'password': value.password
    };
    this.auth.registerUser(user).subscribe((res) => {
      if (res['success']) {
        this.flashMessage.show('You have been successfully registered', {cssClass: 'custom-alert-success', timeout: 5000});
        this.routes.navigateByUrl('home/login');
      } else {
        this.flashMessage.show('A problem has occured!', {cssClass: 'custom-alert-danger', timeout: 5000});
      }
    });
  }

}
