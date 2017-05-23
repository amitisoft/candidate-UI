import {Injectable} from "@angular/core"
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CandidateExampageService{
	constructor(private _http:Http) { }
	allQuestions:any;
	time:any;
	userExamStatus:any;
	userToken:any;
	getNextQuestion(){
		var randomId = Math.floor(Math.random()*10);
		return this.allQuestions =  this._http.get('https://questiontable-630db.firebaseio.com/allQuestions.json').map(res => res.json());

	}

	postThisAnswer(rightAnswer){
		return this._http.post('https://online-exam-6e472.firebaseio.com/online-exam.json',rightAnswer);
	}

	getTime(){
		return this.time =  this._http.get('https://questiontable-630db.firebaseio.com/examTime.json').map(res => res.json());

	}
}


