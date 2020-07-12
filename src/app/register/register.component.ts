import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service'
import { Observable } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private auth: AuthenticationService, private fb: FormBuilder, private route: Router) { 
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
      this.route.navigateByUrl("/login");
    }),
    (err)=>{
      console.log("error");  
    };
  }
}
