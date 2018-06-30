import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  loginAdmin(admin) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/admin/authenticate', admin, {headers: headers});
  }

  setAdminProfile(value: boolean) {
    this.adminProfile = value;
  }

}
