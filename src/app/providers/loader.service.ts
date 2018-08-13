import { Injectable } from "@angular/core";

@Injectable()
export class LoaderService{

    isLoader : boolean = false;

    set Loader(value:boolean){
        this.isLoader = value
    }

    get Loader(){
        return this.isLoader;
    }
}