import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Teacher } from 'src/app/models/teacher';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-teacherinfo',
  templateUrl: './teacherinfo.component.html',
  styleUrls: ['./teacherinfo.component.css']
})
export class TeacherinfoComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private alertifyService: AlertifyService) {
    this.createForm();
  }
  registerForm: FormGroup;
  personel: string;
  education: string;
  age: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  teacherId: any;
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';

  teacher: any;
  decodedToken: any;
  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));

    if (this.decodedToken === null || this.decodedToken.role !== '1') {
      this.router.navigateByUrl('home');
    } else {
      this.teacherId = this.decodedToken.nameid;
      this.teacher = new Teacher;

      this.getTeacher().subscribe(data => {
        this.teacher = data;
        this.education = this.teacher.education;
        this.age = this.teacher.age;


      });
      console.log(this.decodedToken.nameid);
    }
  }
  getTeacher() {
    return this.http.get<Teacher[]>(this.path + 'api/teachers/detail/?id=' + Number(this.teacherId));
  }
  // tslint:disable-next-line:no-shadowed-variable
  SaveTeacher() {

    this.teacher.education = this.education;
    this.teacher.age = this.age;
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.path + 'api/teachers/update', this.teacher, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success('Kayıt Yapıldı');
        setInterval(function () {
          window.location.reload(false);
        }, 1500);
      }, (err: HttpErrorResponse) => {
        if (err) {
          this.alertifyService.error('hata' + err.status.toString());
        }
      });

  }
  submit() {

    this.age = this.registerForm.get('age').value;
    if (this.age !== null && this.age !== '') {

      this.SaveTeacher();
      console.log(this.teacher);
    }
  }
  createForm() {
    this.registerForm = this.fb.group({
      education: ['', Validators.requiredTrue],
      age: ['', Validators.required],

    });
  }
}
