import {Injectable} from "@angular/core"
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GetCandidateTestStatusService{
	constructor(private _http:Http) { }
	userExamStatus:any;
	userToken:any;
	getUserExamStatus(){
		this.userToken = 'eyJib29raW5nSWQiOiJiMSIsInRva2VuSWQiOiIyMCIsImVtYWlsIjoiaHR0cHM6Ly93d3cuYW1pdGkuZXhhbSJ9';
		return this.userExamStatus = this._http.get('https://uoxd8c9q5m.execute-api.us-east-1.amazonaws.com/dev/api/testLinkInfo/'+this.userToken).map(res => res.json());
	}
}


