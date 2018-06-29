import { Injectable } from '@angular/core';
import { BackEndService } from './back-end.service';
import { BehaviorSubject, Observable } from 'rxjs';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _events: BehaviorSubject<any> = new BehaviorSubject(null);
  public events: Observable<any> = this._events.asObservable();

  private _errors: BehaviorSubject<any> = new BehaviorSubject(null);
  public errors: Observable<any> = this._errors.asObservable();

  constructor( private backend: BackEndService ) { }

  eventChange() {
    this._events.next('update');
  }

  get getEventObservable(): any {
    return this.events;
  }

  get getErrorObservable(): any {
    return this.errors;
  }

}
