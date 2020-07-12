import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
import { Observable } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private auth: AuthenticationService, private fb: FormBuilder, private route: Router, public toast: ToastService) { 
    if(localStorage.getItem("user-token"))
      this.route.navigateByUrl("/dashboard")
    this.registerForm = this.fb.group({
    'firstName': this.fb.control(""),
    'lastName': this.fb.control(""),
    'email': this.fb.control(""),
    'password': this.fb.control("")
  });
}

  ngOnInit(): void {
  }
  register=()=>{
    console.log(this.registerForm.value);
    this.auth.registerService(this.registerForm.value)
    .subscribe((res) => {
      this.toast.show('Registration Successful..', {
        classname: 'bg-success text-light',
        delay: 4000,
        autohide: true
      });
      this.route.navigateByUrl("/login");
    }),
    (err)=>{
      this.toast.show('Registration unsuccessful..', {
        classname: 'bg-success text-light',
        delay: 4000,
        autohide: true
      });
      console.log("error");  
    };
  }
}
