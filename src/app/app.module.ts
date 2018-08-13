import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { SideBarModule } from "./components/sidebar/sidebar.module";
import { ToastService } from './providers/toast.service';
import { ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { velocity: 0.1, threshold: 1 }
  }
}

/* Custom property for toast message */
export class CustomOption extends ToastOptions {
  animate = 'flyRight';
  newestOnTop = true;
  showCloseButton = true;
  positionClass = 'toast-bottom-center';
  toastLife: 300000;
}

@NgModule({
  imports: [BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    SideBarModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    RouterModule.forRoot([
      {
        path: "",
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: "login",
        loadChildren: 'app/components/login-signup/login-signup.module#LoginSignUpModule'
      },
      {
        path: "profile/:id",
        loadChildren: 'app/components/profile/profile.module#ProfileModule'
      },
      {
        path: "home",
        loadChildren: 'app/components/home/home.module#HomeModule'
      },
      {
        path: "feedback",
        loadChildren: 'app/components/feedback/feedback.module#FeedbackModule'
      },
      {
        path: "messaging",
        loadChildren: 'app/components/messaging/messaging.module#MessagingModule'
      },
      {
        path : "chat",
        loadChildren : 'app/components/chat/chat.module#ChatModule'
      },
      {
        path : "category/:type",
        loadChildren : 'app/components/category/category.module#CategoryModule'
      },
      {
        path : "privacy",
        loadChildren : 'app/components/privacy/privacy.module#PrivacyModule'
      }      
    ])
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    ToastService,
    { provide: ToastOptions, 
      useClass: CustomOption },
    {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }] // use our custom hammerjs config
})

export class AppModule { }