import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor( private auth: AdminService, private routes: Router ) {}

    canActivate() {
        if (this.auth.adminLoggedIn) {
            return true;
        } else {
            this.routes.navigateByUrl('admin/login');
            return false;
        }
    }
}
