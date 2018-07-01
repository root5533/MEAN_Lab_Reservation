import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AdminService } from "./admin.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken;
  user;
  userExist: boolean;

  userVisibilityChange: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient, private admin: AdminService) {
    if (localStorage.getItem('id_token')) {
      this.userExist = true;
    } else {
      this.userExist = false;
    }
    this.userVisibilityChange.subscribe((value) => {
      // console.log('received new value : ', value);
      this.userExist = value;
    });
  }

  get userAvailable(): boolean {
    return this.userExist;
  }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    .toPromise();
  }

  loginUser(user) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers});
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.userVisibilityChange.next(true);
  }

  logOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.userVisibilityChange.next(false);
    this.admin.logoutAdmin();
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.set('Authorization', this.authToken);
    headers = headers.set('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile', {headers: headers});
  }

  loadToken() {
    this.authToken = localStorage.getItem('id_token');
  }

  getToken() {
    this.loadToken();
    return this.authToken;
  }

}
