import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarEventsService {

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
    return this.http.get('http://localhost:3000/api/events/' + id, {headers: headers});
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

}
