import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CourseApp';
  userName = localStorage.getItem('userName');
  constructor(
    private router: Router, private auth: AuthService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    console.log('rgre');
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    console.log('rgre');

  }
}
