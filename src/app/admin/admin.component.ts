import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (Number(localStorage.getItem('role')) !== 0 || localStorage.getItem('role') === null) {
      this.router.navigate(['home']);

    }
  }

}
