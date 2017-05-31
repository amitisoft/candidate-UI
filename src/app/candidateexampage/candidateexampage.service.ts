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

	getAPIQuestion(qsNumber,bookingId,candidateId,category,paperType){
		//return this.allQuestions =  this._http.get('https://abqh4tyop2.execute-api.us-east-1.amazonaws.com/dev/api/getAllQsnIds/BookingId/b2/QuestionPaperId/JA/CurtQsnNo/'+qsNumber+'/Category/Java').map(res => res.json());
		return this.allQuestions =  this._http.get('https://yufinedfhg.execute-api.us-east-1.amazonaws.com/dev/api/getAllQsnIds/BookingId/'+bookingId+'/QuestionPaperId/'+paperType+'/CurtQsnNo/'+qsNumber+'/Category/'+category).map(res => res.json());
	}

	postThisAnswer(rightAnswer){
		//return this._http.post('https://online-exam-6e472.firebaseio.com/online-exam.json',rightAnswer);
		return this._http.post('https://yufinedfhg.execute-api.us-east-1.amazonaws.com/dev/api/updateResult',rightAnswer);
	}
}


