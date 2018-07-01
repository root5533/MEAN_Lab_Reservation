import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminService } from "../../services/admin.service";
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

  constructor( private fb: FormBuilder, private auth: AuthService, private routes: Router,
    public snackBar: MatSnackBar, private admin: AdminService ) {

    this.adminForm = fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {

    if (this.admin.adminLoggedIn) {
      this.routes.navigateByUrl('/admin');
    }

  }

  adminLogin(value) {
    const admin = {
      'username': value.username,
      'password': value.password
    };
    this.auth.loginUser(admin).subscribe((res) => {
      if (res['success']) {
        const isadmin = this.admin.loginAdmin(res['user']);
        if (isadmin){
          this.auth.storeUserData(res['token'], res['user']);
          this.admin.setAdminProfile(true);
          this.openSnackBar(res['msg'], 'LOGGED');
          this.routes.navigateByUrl('/admin');
        } else {
          this.openSnackBar('Please login with admin credentials', 'NOT ADMIN');
        }
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
