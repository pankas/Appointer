import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Urls } from "../../configs/urls";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CustomHttpService } from "../../providers/customHttp.service";

@NgModule({
    imports : [ 
        FormsModule, 
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        RouterModule.forChild([
        {
            path : '',
            component : ProfileComponent
        }
    ])],
    providers : [ Urls,CustomHttpService ],
    declarations : [ ProfileComponent ] 
})
export class ProfileModule{
    constructor(){}
}