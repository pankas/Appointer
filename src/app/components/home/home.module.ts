import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router"
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { Urls } from "../../configs/urls";
import { HttpClientModule } from "@angular/common/http"; 
import { CustomHttpService } from "../../providers/customHttp.service";

@NgModule({

    declarations : [ HomeComponent ],
    imports : [
        HttpClientModule,
        CommonModule,
        RouterModule.forChild([
            {
                path : '',
                component : HomeComponent
            }
        ])
    ],
    providers : [ Urls,CustomHttpService ]
})
export class HomeModule {

}