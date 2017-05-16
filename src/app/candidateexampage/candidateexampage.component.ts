import { Component, OnInit } from '@angular/core';
import {getQuestionService} from '../getquestion.service';

@Component({
  selector: 'cui-candidateexampage',
  templateUrl: './candidateexampage.component.html',
  styleUrls: ['./candidateexampage.component.css'],
  providers: [getQuestionService]
})
export class CandidateexampageComponent implements OnInit {

  getData:any;
  selectedAnswers:Array<any> = [];
  rightAnswer = [];
  allQuestions=[];
  totalQuestions=[];
  firstQuestion =[];
  constructor(private _httpService: getQuestionService) { }

    ngOnInit(){
      this.getQuestion(0);
    }


  getQuestion(qsNumber){
    this._httpService.getNextQuestion().subscribe(
          data => {
                for (let key in data) {
                    this.allQuestions.push(data[key]);
                }
                this.totalQuestions = this.allQuestions;
                this.firstQuestion =  this.totalQuestions[qsNumber];
            }
      );
  }

  postAnswer(id){
    this.rightAnswer.push({
      id: id,
      answers: this.selectedAnswers
    });
    this._httpService.postThisAnswer(this.rightAnswer).subscribe(
      () => {this.getQuestion(id)}
    );
  }


  getSelectedBox(selectedAns, chkBoxStatus){
    if(chkBoxStatus===true){
      console.log(selectedAns);
      this.selectedAnswers.push(selectedAns);
      console.log(this.selectedAnswers);
    }else{
      var selectedAnsIndex = this.selectedAnswers.indexOf(selectedAns);
      if(selectedAnsIndex !== -1){
        this.selectedAnswers.splice(selectedAnsIndex, 1);
        console.log(this.selectedAnswers);
      }
    }
  }

}
