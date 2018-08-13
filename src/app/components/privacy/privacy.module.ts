import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router"
import { PrivacyComponent } from "./privacy.component";
import { LoaderService } from "../../providers/loader.service";

@NgModule({
    declarations : [
        PrivacyComponent
    ],
    providers : [LoaderService],
    imports : [
        
        RouterModule.forChild([
            {
                path : '',
                component : PrivacyComponent 
            }
        ])
    ]
})
export class PrivacyModule{

}