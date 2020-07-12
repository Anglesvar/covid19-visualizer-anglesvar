import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private auth: AuthenticationService, private fb: FormBuilder,
     private route: Router, public toast: ToastService) { 
      if(localStorage.getItem('user-token'))
        this.route.navigateByUrl("/dashboard");

    this.loginForm = this.fb.group({
    email: this.fb.control(""),
    password: this.fb.control("")
  });
}

  ngOnInit(): void {
  }
  login=()=>{
    console.log(this.loginForm.value);
    this.auth.loginService(this.loginForm.value)
    .subscribe(res => {
      console.log(res);
      localStorage.setItem("user-token",res["user-token"])
      this.toast.show('Login Successful', {
        classname: 'bg-success text-light',
        delay: 2000,
        autohide: true
      });
      this.route.navigateByUrl("/dashboard");
    });
    
  }


}
