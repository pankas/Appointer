import { Injectable } from "@angular/core";
import { CustomHttpService } from "./customHttp.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Urls } from "../configs/urls";
import 'rxjs/add/operator/map';

@Injectable()
export class ServicesService{

    constructor( private urls : Urls, private htttp : HttpClient, private http : CustomHttpService){

    }

    getCategories(){
        return this.http.get(`/getData/services`)
    }

    getUsers(type){
        return this.http.get(`/getUsers/${type}`)
    }

    getServiceList(type){
        return this.http.get(`/getData/${type}`)
    }

    addService(data){
        return this.http.put('/addService',data)
    }

    getUserProfile(id){
        return this.http.get(`/userProfile/${id}`)
    }

    removeService(service){
        return this.http.delete(`/removeService/${service}`);
    }

    getRatings(user,service){
        return this.http.get(`/getRatings/${user}/${service}`);
    }
    setPic(form){
        let requestHeaders = new HttpHeaders()
            .set('Authorization', 'Bearer a6de5ec475959c3e746c84a1aeba2088c507b1f4');
        return this.htttp.post('https://api.imgur.com/3/image?Authorization=Client-ID f074d91c4297906&Authorization=Bearer a6de5ec475959c3e746c84a1aeba2088c507b1f4',form,{ headers : requestHeaders, observe: 'response'}).map(res=>res.body)
    }

    updateProfile(data){
        return this.http.put('/updateProfile',data)
    }
}