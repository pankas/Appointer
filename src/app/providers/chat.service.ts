import { Injectable } from "@angular/core";
import { CustomHttpService } from "./customHttp.service";
import { Urls } from "../configs/urls";
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService{
    constructor(private urls : Urls, private http : CustomHttpService){

    }

    getMessages(conv_id, pg){
        return this.http.get(`/getMessages/${conv_id}/${pg}`)
    }

    getChats(id){
        return this.http.get(`/getChats`)
    }
}