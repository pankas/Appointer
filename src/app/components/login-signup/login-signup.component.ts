import { Component } from "@angular/core";
import { LoginSignUpService } from "../../providers/login.service";
import { Router } from "@angular/router";
import { ToastService } from "../../providers/toast.service";

@Component({
    selector: 'login-signup',
    templateUrl: 'login-signup.component.html',
    styleUrls: ['login-signup.component.css'],
    providers: [LoginSignUpService, ToastService]
})
export class LoginSignUpComponent {
    loginCheck: boolean = true;

    message = '';
    loginForm = {
        username: '',
        password: ''
    };
    signUpForm = {
        name: '',
        password: '',
        email: '',
        location: {},
        phone: null
    }
    constructor(private lss: LoginSignUpService, private router: Router, private toast: ToastService) {

    }

    login() {
        if (this.loginForm.username.indexOf('@') != -1) {
            this.loginForm['email'] = this.loginForm.username;
        } else {
            this.loginForm['phone'] = this.loginForm.username;
        }
        delete this.loginForm.username;
        this.lss.login(this.loginForm).subscribe((res: any) => {
            console.log(res);
            this.toast.customToast('Login Successful!');
            localStorage.setItem('id', res.data._id);
            localStorage.setItem('appointer-token', res.token);
            localStorage.setItem('name', res.data.name);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('phone', res.data.phone);
            res.data.services = res.data.services.map((service) => JSON.stringify(service));
            localStorage.setItem('services', JSON.stringify(res.data.services));
            localStorage.setItem('profile_pic', res.data.profile_pic);
            this.router.navigate(['profile', res.data._id]);
        }, (err: any) => {
            this.toast.customToast('Invalid Credentials!');
        })
    }




    signUp() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                this.signUpForm.location = {
                    type: "point",
                    coordinates: [
                        location.coords.longitude, location.coords.latitude]
                }
                this.lss.signup(this.signUpForm).subscribe((res: any) => {
                    console.log(res);
                    this.toast.customToast(res.message);
                }, (err: any) => {

                })

            }
            );
        }else{
            this.lss.signup(this.signUpForm).subscribe((res: any) => {
                console.log(res);
                this.toast.customToast(res.message);
            }, (err: any) => {

            })
        }
        // console.log(this.location);

    }
}