import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  name = '';
  constructor() {}

  ngOnInit(): void {}

  startQuiz() {
    localStorage.setItem('userName', this.name);
    console.log('====================================');
    console.log(this.name);
    console.log('====================================');
  }
}
