import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (Number(localStorage.getItem('role')) !== 1 || localStorage.getItem('role') === null) {
      this.router.navigate(['home']);

    }
  }

}
