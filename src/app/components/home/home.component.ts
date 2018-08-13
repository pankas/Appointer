import { Component, OnInit } from "@angular/core";
import { CategoriesList } from "../../modals/lists";
import { ServicesService } from "../../providers/services.service";
import { LoaderService } from "../../providers/loader.service";

declare let $ :any;
@Component({
    selector : 'home',
    templateUrl : 'home.component.html',
    styleUrls : ['home.component.css'],
    providers : [ ServicesService ]
})
export class HomeComponent implements OnInit{

    categories : CategoriesList[] = [];

    constructor(private ss : ServicesService, private ls : LoaderService){

    }

    ngOnInit(){
        this.getCategories();
    }

    getCategories(){
        this.ss.getCategories().subscribe((res:any)=>{
            this.categories = res.data;
            this.ls.Loader = false;    
        },(err:any)=>{
            this.ls.Loader = false;
        })
        
    }

    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    swipe(action) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            $('.carousel-control-prev').click();
        }
        if (action === this.SWIPE_ACTION.LEFT) {
            $('.carousel-control-next').click();
        }
    }
}