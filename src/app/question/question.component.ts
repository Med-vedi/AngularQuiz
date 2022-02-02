import { QuestionService } from './../service/question.service';
import { Component, OnInit } from '@angular/core';

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

  public questionList: IQuestion[] = [];

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
}
