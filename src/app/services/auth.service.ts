import { users } from './../models/users';
import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from './alertify.service';
import { loginUser } from './../models/loginUser';
import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { registerUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router,

    private alertifyService: AlertifyService) {
    this.role = localStorage.getItem('role');
    this.userName = localStorage.getItem('userName');
  }
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/api/auth/';
  userToken: any;
  error: any;
  id: any;
  admin: Boolean = false;
  teacher: Boolean = false;
  isLoggedIn = false;

  users: any;
  loginControl: Boolean = false;
  role: any;
  userName: any;
  decodedToken: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = 'token';
  // tslint:disable-next-line:no-shadowed-variable
  login(loginUser: loginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'login', loginUser, { headers: headers }
    )
      .subscribe(data => {
        this.saveToken(data);
        this.userToken = data;
        this.decodedToken = this.jwtHelper.decodeToken(data.toString());
        console.log(this.decodedToken);
        localStorage.setItem('userName', loginUser.userName);
        this.getRoles(loginUser.userName).subscribe(data2 => {
          this.users = data2;
          this.role = this.users.role;
          this.userName = this.users.userName;
          localStorage.setItem('role', this.role);
          this.alertifyService.success(loginUser.userName + ' Sisteme hoşgeldin.Hemen Yönlendiriliyorsun.');

        });


      },
        error => {
          this.error = error;
          this.alertifyService.error('Kullanıcı adı veya şifre yanlış.');

        }
      );

  }

  getRoles(id: string) {
    return this.httpClient.get<users[]>('https://onlinestudentapi20210628022058.azurewebsites.net/api/users/detail/?username=' + id);
  }

  // tslint:disable-next-line:no-shadowed-variable
  register(registerUser: registerUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient.post(this.path + 'register', registerUser, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success('Kayıt Yapıldı');

        this.router.navigateByUrl('allusers');

      }, (err: HttpErrorResponse) => {
        if (err.status === 400) {
          this.alertifyService.error('Kullanıcı adı sistemde mevcut.');

        } else {


          this.alertifyService.error(err.status.toString() + 'Hata');
        }
      });
  }
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    this.alertifyService.error('Görüşmek üzere...');
    this.loginControl = false;
    this.router.navigate(['home']);

  }
  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }
  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getCurrentUserId() {
    // tslint:disable-next-line:no-unused-expression
    this.jwtHelper.decodeToken(this.token).nameid;
  }
  getRole() {
    if (this.role === 0 || this.role === '0') {
      return 1;
    } else {
      return 2;
    }
  }
}
