import {Injectable} from "@angular/core"
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CandidateResultsService{
	constructor(private _http:Http) { }
	results:any;

	getCandidateResults(candidateId){
		return this.results =  this._http.get('https://yufinedfhg.execute-api.us-east-1.amazonaws.com/dev/api/getAllQsnIds/BookingId/'+candidateId).map(res => res.json());
	}
}


