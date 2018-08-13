import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../providers/loader.service";

@Component({
    selector : 'privacy',
    templateUrl : 'privacy.component.html'
})
export class PrivacyComponent implements OnInit{
    
    constructor(private ls :LoaderService){}
    ngOnInit(){
        this.ls.Loader = false;
    }
}