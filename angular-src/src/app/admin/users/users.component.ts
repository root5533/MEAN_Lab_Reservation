import { Component, OnInit } from '@angular/core';
import { BackEndService } from "../../services/back-end.service";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any;

  constructor( private backend: BackEndService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.backend.getAllUsers().subscribe((res) => {

      if (res['success']) {
        this.users = res['users'];
      } else {
        this.openSnackBar(res['msg'], 'FAILED');
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
