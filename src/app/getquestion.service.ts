import {Injectable} from "@angular/core"
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class getQuestionService{
	constructor(private _http:Http) { }
	allQuestions:any;
	time:any;
	getNextQuestion(){
		var randomId = Math.floor(Math.random()*10);
		return this.allQuestions =  this._http.get('https://questiontable-630db.firebaseio.com/allQuestions.json').map(res => res.json());

	}

	postThisAnswer(rightAnswer){
		/*var json = JSON.stringify({});
		var params = 'json'+ json;
		var headers = new Headers();
		headers.append('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post('', params, {

		}).map(res => res.json());*/
		return this._http.post('https://online-exam-6e472.firebaseio.com/online-exam.json',rightAnswer);
	}

	postTime(timeObject){
		return this._http.post('https://questiontable-630db.firebaseio.com/examTime.json',timeObject);
	}

	getTime(){
		return this.time =  this._http.get('https://questiontable-630db.firebaseio.com/examTime.json').map(res => res.json());

	}
}


