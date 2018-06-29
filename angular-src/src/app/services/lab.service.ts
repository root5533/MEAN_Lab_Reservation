import { Injectable } from '@angular/core';
import { BackEndService } from './back-end.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  private _selectedLab: BehaviorSubject<any> = new BehaviorSubject(null);
  public selectedLab: Observable<any> = this._selectedLab.asObservable();
  public currentLab: any;

  constructor( private backend: BackEndService ) { }

  labChange(lab) {
    this.currentLab = lab;
    this._selectedLab.next(lab);
  }

  get getSelectedLab(): any {
    return this.selectedLab;
  }

  get getCurrentLab(): any {
    if (this.currentLab) {
      return this.currentLab;
    } else {
      return null;
    }
  }

}
