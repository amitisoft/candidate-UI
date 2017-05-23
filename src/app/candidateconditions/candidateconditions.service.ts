import {Injectable} from "@angular/core"
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CandidateConditionsService{
	constructor(private _http:Http) { }
	postTime(timeObject){
		return this._http.post('https://questiontable-630db.firebaseio.com/examTime.json',timeObject);
	}
}


