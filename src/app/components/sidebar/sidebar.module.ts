import { NgModule } from "@angular/core";
import { SideBarComponent } from "./sidebar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Urls } from "../../configs/urls";
import { HttpClientModule } from "@angular/common/http";
import { CustomHttpService } from "../../providers/customHttp.service"; 

@NgModule({
    imports : [RouterModule,CommonModule,HttpClientModule],
    declarations : [ SideBarComponent ],
    exports : [ SideBarComponent ],
    providers : [CustomHttpService,Urls]
    
    })
export class SideBarModule{

}