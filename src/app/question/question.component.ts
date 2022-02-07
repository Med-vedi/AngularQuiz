import { QuestionService } from './../service/question.service';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

export interface IQuestion {
  questionText: string;
  explanation: string;
  options: { text: string; correct?: boolean };
}
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  public name: string = 'Guest';

  public currentQuestion: number = 0;
  public points: number = 0;
  public questionList: IQuestion[] = [];

  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  btnIsDisabled = false;

  answersObj = {};

  counter = 60;

  interval$: any;

  constructor(private questionsService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('userName');
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionsService.getQuestionJSON().subscribe((res: any) => {
      this.questionList = res?.questions;
    });
  }

  next() {
    this.currentQuestion++;
  }

  prev() {
    this.currentQuestion--;
  }

  handleAnswer(idx: number, correct: boolean = false) {
    this.btnIsDisabled = true;
    this.answersObj[idx] = correct;
    setTimeout(() => {
      this.currentQuestion++;
      this.btnIsDisabled = false;
    }, 500);
    // got the correct answer
    if (correct) {
      this.correctAnswers++;
      return (this.points += 10);
    }
    // got incorrect answer
    this.incorrectAnswers--;
    this.points -= 10;
  }

  log() {
    console.log('====================================');
    console.log(this.answersObj);
    console.log('====================================');
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points - +10;
      }
      setTimeout(() => {
        this.interval$.unsubscribe();
      }, 600000);
    });
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
}
