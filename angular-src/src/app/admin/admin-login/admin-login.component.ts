import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  adminForm: FormGroup;

  constructor( private fb: FormBuilder, private auth: AdminService, private routes: Router,
    public snackBar: MatSnackBar ) {

    this.adminForm = fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {

    if (this.auth.adminLoggedIn) {
      this.routes.navigateByUrl('/admin');
    }

  }

  adminLogin(value) {
    const admin = {
      'username': value.username,
      'password': value.password
    };
    this.auth.loginAdmin(admin).subscribe((res) => {
      if (res['success']) {
        this.auth.setAdminProfile(true);
        this.openSnackBar(res['msg'], 'LOGIN');
        this.routes.navigateByUrl('/admin');
      } else {
        this.openSnackBar(res['msg'], 'FAILED');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
