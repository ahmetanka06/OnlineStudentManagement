import { registerUser } from './../../models/registerUser';
import { AlertifyService } from './../../services/alertify.service';
import { Student } from './../../models/student';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-studentinfo',
  templateUrl: './studentinfo.component.html',
  styleUrls: ['./studentinfo.component.css']
})
export class StudentinfoComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient, private alertifyService: AlertifyService) {
    this.createForm();
  }
  registerForm: FormGroup;
  name: string;
  fees: Number = 5000;
  path = 'https://onlinestudentapi20210628022058.azurewebsites.net/';

  personel: string;
  age: Number;
  education: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  studentId: any;
  student: any;
  decodedToken: any;
  ngOnInit() {
    this.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.student = new Student;
    if (this.decodedToken === null || this.decodedToken.role !== '2') {
      this.router.navigateByUrl('home');
    } else {
      this.studentId = this.decodedToken.nameid;

      this.getStudent().subscribe(data => {
        console.log(data);
        this.student = data;
        this.personel = this.student.personalDetail;
        this.fees = this.student.feesDetail;
        this.education = this.student.educationDetail;
        this.age = Number(this.student.age);
        this.name = this.student.studentName;


      });
      console.log(this.decodedToken.nameid);
    }

  }
  getStudent() {
    return this.http.get<Student[]>(this.path + 'api/students/detail/?id=' + Number(this.studentId));
  }
  // tslint:disable-next-line:no-shadowed-variable
  SaveStudent() {
    this.student.personalDetail = this.personel;
    this.student.educationDetail = this.education;
    this.student.age = this.age.toString();
    this.student.studentName = this.name;
    console.log(this.student);
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.put(this.path + 'api/students/update', this.student, { headers: headers })
      .subscribe(data => {
        this.alertifyService.success('Kayıt Yapıldı');
      }, (err: HttpErrorResponse) => {
        if (err) {
          this.alertifyService.error('hata' + err.status.toString());
        }
      });

  }
  submit() {

    this.age = this.registerForm.get('age').value;
    this.fees = this.registerForm.get('fees').value;
    this.name = this.registerForm.get('name').value;

    if (this.name !== null && this.name !== '') {

      this.SaveStudent();
      console.log(this.student);
    } else {
      alert('İsim boş olamaz');
    }
  }
  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      fees: ['', Validators.requiredTrue],
      personel: ['', Validators.requiredTrue],
      education: ['', Validators.requiredTrue],
      age: ['', Validators.requiredTrue],

    });
  }

}
