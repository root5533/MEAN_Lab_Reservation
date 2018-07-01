import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminProfile: boolean;

  constructor(private http: HttpClient) { }

  get adminLoggedIn(): boolean {
    if (this.adminProfile) {
      return true;
    } else {
      return false;
    }
  }

  loginAdmin(user) {
    if (user.username === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  setAdminProfile(value: boolean) {
    this.adminProfile = value;
  }

  logoutAdmin() {
    this.adminProfile = false;
  }

}
