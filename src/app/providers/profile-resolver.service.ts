import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { UserProfile } from "../modals/lists";
import { CustomHttpService } from "../providers/customHttp.service";
import { Observable } from "rxjs/Observable";
import { ServicesService } from "../providers/services.service";

@Injectable()
export class ProfileResolver implements Resolve<UserProfile>{

    user : UserProfile;
    constructor(private ss : ServicesService ){

    }

    resolve(route: ActivatedRouteSnapshot): Observable<UserProfile> {

        const id = route.paramMap.get('id');
        // if(localStorage.getItem('id') === id){
        //     return new Observable<UserProfile>((observer)=>{
        //         observer.next(this.user);
        //     }) 
        // }
        return this.ss.getUserProfile(id)
    }
}