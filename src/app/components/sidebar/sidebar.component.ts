import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { CategoriesList } from "../../modals/lists";
import { ToastService } from "../../providers/toast.service";
import { ServicesService } from "../../providers/services.service";
import { LoaderService } from "../../providers/loader.service";

@Component({
    selector : 'side-bar',
    templateUrl : 'sidebar.component.html',
    styleUrls : ['sidebar.component.css'],
    providers : [ServicesService]
})
export class SideBarComponent implements OnInit, OnDestroy{

    @Input() open : boolean = false;

    local : any;
    loggedIn : boolean = false;
    showSublist : Boolean = false;
    subList : CategoriesList[]=[];
 
    constructor(private router : Router,private ss : ServicesService, private toast : ToastService, private ls :LoaderService){
        this.local = localStorage
    }
    
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight', TOP : 'top', BOTTOM : 'bottom' };
    swipe(action) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            this.open = true;
        }
        else if (action === this.SWIPE_ACTION.LEFT) {
          this.open = false;
        }
    }
 
    ngOnDestroy(){
        this.ls.Loader = true;
    }

    ngOnInit(){
        if(localStorage.getItem('appointer-token')){
            this.loggedIn = true;
        }
        // this.getServices();
    }

    getServices(){
        this.ss.getServiceList('services').subscribe((res:any)=>{
            this.subList = res.data;
        },(err:any)=>{

        })
    }

    toProfile(){
        if(!localStorage.getItem('appointer-token')){
            this.router.navigate(['login'])
        }else{
            this.router.navigate(['profile',localStorage.getItem('id')])
        }
    }

    logout(){
        this.loggedIn = false;
        localStorage.clear();
        this.toast.customToast("You're Logged Out Successfully");
        this.router.navigate(['/']);
    }
    
    
    fun($event){
        this.showSublist = !this.showSublist;
        $event.stopPropagation();
    }   
    
}