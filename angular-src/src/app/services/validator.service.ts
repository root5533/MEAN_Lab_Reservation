import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  public noWhitespaceValidator(control: FormControl) {
    let isWhitespace = (control.value || '').trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true }
  }

  public isInteger(control:FormControl) {
    if((parseFloat(control.value) == parseInt(control.value)) && !isNaN(control.value)){
      return true;
    } else {
      return false;
    }
  }

}
