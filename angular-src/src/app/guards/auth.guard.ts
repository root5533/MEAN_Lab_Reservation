import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private auth: AuthService, private routes: Router ) {}

    canActivate() {
        if (this.auth.userExist) {
            return true;
        } else {
            this.routes.navigateByUrl('home/login');
            return false;
        }
    }
}
