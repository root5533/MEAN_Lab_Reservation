import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BackEndService {

  constructor( private http: HttpClient, private auth: AuthService ) { }

  getLabs() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/api/labs', {headers: headers});
  }

  getEventsFromLab(id) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/api/event/' + id, {headers: headers});
  }

  getUserEventsFromLab(id) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/api/event/user_events/' + id, {headers: headers});
  }

  getEventsFromDate(date) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/event/event_validate', date, {headers: headers});
  }

  addNewReservation(event) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/event', event, {headers: headers});
  }

  updateReservation(event) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/event', event, {headers: headers});
  }

  deleteReservation(id) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.delete('http://localhost:3000/api/event/' + id, {headers: headers});
  }

  createNewLab(lab) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/lab', lab, {headers: headers});
  }

  deleteLab(lab_id) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.delete('http://localhost:3000/api/lab/' + lab_id, {headers: headers});
  }

  updateLab(lab) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/lab', lab, {headers: headers});
  }

  getAllUsers() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/users', {headers: headers});
  }

  getEventsForReport(data) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/event/report', data, {headers: headers});
  }

  getAllEventsToday() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', this.auth.getToken());
    headers = headers.set('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/api/event/all/today', {headers: headers});
  }
}
