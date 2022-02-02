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

  log() {
    console.log('====================================');
    console.log(this.name);
    console.log('====================================');
  }
}
