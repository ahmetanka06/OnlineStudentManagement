import { users } from './../../models/users';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  role: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: any;
  users: users[];
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';
  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.role = this.decodedToken.role;
    if (this.role === null || this.role !== '0') {
      this.router.navigateByUrl('home');
    } else {
      this.getStudents();
    }
  }
  getStudents() {
    this.http.get<users[]>(this.path + 'api/users')
      .subscribe(data => {
        data.forEach(element => {
          if (element.role === 1) {
            element.roleString = 'Teacher';
          } else if (element.role === 2) {
            element.roleString = 'Student';

          } else {
            element.roleString = 'Admin';
          }
          this.users = data;

        });
        console.log(this.users);

      });

  }
}
