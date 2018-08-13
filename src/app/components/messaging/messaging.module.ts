import { NgModule } from "@angular/core";
import { MessagingComponent } from './messaging.component';
import { RouterModule } from "@angular/router";
import { ChatComponent } from "./chat/chat.component";
import { Urls } from "../../configs/urls";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CustomHttpService } from "../../providers/customHttp.service";

@NgModule({
    declarations : [ MessagingComponent,ChatComponent ],
    imports : [ 
        HttpClientModule,
        FormsModule,
        CommonModule,
        RouterModule.forChild([
        {
            path : '',
            component : MessagingComponent
        },
        {
            path : ':id',
            component : ChatComponent
        }
    ]) ],
    providers : [Urls,CustomHttpService]
})
export class MessagingModule{

}