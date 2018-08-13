import { Component, OnInit } from "@angular/core";
import { ChatService } from "../../providers/chat.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../providers/loader.service";

@Component({
    selector : 'messaging',
    templateUrl : 'messaging.component.html',
    providers : [ ChatService ],
    styleUrls : ['messaging.component.css']
})
export class MessagingComponent implements OnInit{

    conversations : any[] = []; 
    local;
    constructor(private cs : ChatService, private router : Router, private ls : LoaderService){
    }

    ngOnInit(){
        this.local = localStorage;
        this.getChats();
    }

    getChats(){
        if(localStorage.getItem('id') && localStorage.getItem('id')!=undefined){
            this.cs.getChats(localStorage.getItem('id')).subscribe((res:any)=>{
                this.ls.Loader = false;
                this.conversations = res.conversations.map(convo => {
                    convo.users = convo.users.filter(user => user._id != this.local.id);
                    return convo;
                });
                this.conversations = this.conversations.filter(convo => "latest" in convo);
                console.log(this.conversations);
            })
        }else{
            this.ls.Loader = false;
        }
        
        
    }

    toChat(index){
        this.ls.Loader = true;
        localStorage.setItem('conversation_to',JSON.stringify(this.conversations[index].users[0]));
        this.router.navigate(['messaging',this.conversations[index]._id]);
    }


}