import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginUser: any = {};
  userName: any;
  role: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  decodedToken: any;
  constructor(public authService: AuthService, private location: Location) {



  }

  ngOnInit() {

  }
  login() {
    this.authService.login(this.loginUser);
  }
  logout() {
    this.authService.logout();
    this.authService.role = null;
    this.authService.userName = null;

  }
  get isAuthenticated() {
    return this.authService.loggedIn();
  }

}
