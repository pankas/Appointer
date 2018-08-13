import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../../providers/services.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserProfile } from "../../modals/lists";
import { ToastService } from "../../providers/toast.service";
import { LoaderService } from "../../providers/loader.service";

declare let $ : any;
@Component({
    selector : 'profile',
    templateUrl : 'profile.component.html',
    styleUrls : [ 'profile.component.css' ],
    providers : [ ServicesService,ToastService ]
})
export class ProfileComponent implements OnInit{
    
    local;
    user : UserProfile;
    services;
    enableChat : boolean = false;
    overallUserRating : number=0;
    noOfRatings : number=0;
    stars = ['','','','',''];
    reviews = [];
    imageForm = new FormData();
        

    constructor( private ss : ServicesService,private toast :ToastService, private ls:LoaderService, private route : ActivatedRoute, private router:Router ){}
    ngOnInit(){
        this.route.params.subscribe((params)=>{
            this.getUserProfile(params);
            if(params.id != localStorage.getItem('id')) this.enableChat = true;
        })
        this.getServicesList();
    }

    getUserProfile(params){
        this.ss.getUserProfile(params.id).subscribe((data)=>{
            this.ls.Loader = false;
            this.user = data.data;
            this.calculateRating();  
        })
    }

    calculateRating(){
        this.user.services.forEach((element)=>{
            element.overallRating = 0, element.noOfRatings = 0;
            for(let rating of element.ratings){
                element.overallRating += +rating;
                element.noOfRatings++;
            }
            this.overallUserRating += element.overallRating;
            this.noOfRatings += element.noOfRatings;
            console.log(this.user.services);
        })
        if(this.noOfRatings != 0) this.overallUserRating = Math.round(this.overallUserRating/this.noOfRatings);
    }

    getServicesList(){
        this.ss.getServiceList('services').subscribe((res:any)=>{
            this.services = res.data;
            console.log(this.services); 
        },(err:any)=>{

        })
    }

    openModal(id){
        console.log(id);
        $(id).modal('show');
    }

    addService(form){
        this.ls.Loader = true;
        form.value.service_name = form.value.service.title;
        form.value.service = form.value.service.route;
        this.ss.addService(form.value).subscribe((res:any)=>{
            form.value.ratings = [];
            this.ls.Loader = false;
            this.toast.customToast('Service Added Successfully')
            this.user.services.push(form.value);
            this.calculateRating();
        },(err:any)=>{
            this.ls.Loader = false;
        })
    }

    removeService(service,index){

        let a = window.confirm('Sure, Want To Delete?');
        if(a){
            this.ss.removeService(service).subscribe((res:any)=>{
                this.user.services.splice(index,1);
            },(err:any)=>{
    
            })
        }
        
    }

    getReviews(service){
        this.ss.getRatings(this.user._id,service).subscribe((res:any)=>{
            this.reviews = res.data;
            this.ls.Loader = false;
            $('#showRatings').modal('show');
        },(err:any)=>{
            this.ls.Loader = false;
        })
    }

    toChat(){
        let to = {
            _id : this.user._id,
            name : this.user.name,
            profile_pic : this.user.profile_pic
        }
        this.ls.Loader = true;
        localStorage.setItem('conversation_to', JSON.stringify(to));
        this.router.navigate(['messaging','new-conversation'])
    }

    onSelect(ev){
        if(ev.target.files[0]){
            this.imageForm.append('image',ev.target.files[0]);
        }
        
    }

    setPic(form){
        this.ls.Loader = true;
        this.ss.setPic(this.imageForm).subscribe((res:any)=>{
            console.log(res);
            this.ls.Loader = false;
            if(res.success){
                localStorage.setItem('profile_pic',res.data.link);
                this.user.profile_pic = res.data.link;
                this.ss.updateProfile({ profile_pic : res.data.link}).subscribe((res:any)=>{

                },(err:any)=>{
                    this.ls.Loader = false;
                })
            }
            
        },(err:any)=>{
            this.ls.Loader = false;
        })
    }

}