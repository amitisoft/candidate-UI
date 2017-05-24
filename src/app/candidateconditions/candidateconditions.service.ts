import {Injectable} from "@angular/core"
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CandidateConditionsService{
	constructor(private _http:Http) { }
	postTime(timeObject){
		return this._http.post('https://uoxd8c9q5m.execute-api.us-east-1.amazonaws.com/dev/api/updateExamTimingSlot',timeObject);
	}
}


