import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Urls } from "../configs/urls";
import 'rxjs/add/operator/map';

@Injectable()
export class LoginSignUpService{
    constructor(private http : Http, private  urls : Urls){

    }

    signup(data){
        return this.http.post(this.urls.base_url + '/sign-up', data).map(res => res.json());
    }

    login(data){
        return this.http.post(this.urls.base_url + '/login', data).map(res => res.json());
    }
}