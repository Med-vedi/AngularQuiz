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
  isQuizCompleted: Boolean = false;

  answersObj = {};

  counter = 60;
  progress: number = 0;

  interval$: any;

  constructor(private questionsService: QuestionService) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('userName');
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.questionsService.getQuestionJSON().subscribe((res: any) => {
      this.questionList = res?.questions;
    });
  }

  next() {
    this.currentQuestion++;
    this.startCounter();
  }

  prev() {
    this.currentQuestion--;
  }

  handleAnswer(idx: number, correct: boolean = false) {
    this.btnIsDisabled = true;
    this.answersObj[idx] = correct;
    this.handleProgressChange();
    this.resetCounter();

    setTimeout(() => {
      if (this.currentQuestion + 1 === this.questionList.length) {
        this.stopCounter();
        return (this.isQuizCompleted = true);
      }
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

  handleProgressChange() {
    this.progress =
      ((this.currentQuestion + 1) / this.questionList.length) * 100;
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe(() => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
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
    this.isQuizCompleted = false;
  }

  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.currentQuestion = 0;
    this.points = 0;
    this.progress = 0;
    this.counter = 60;
  }
}
