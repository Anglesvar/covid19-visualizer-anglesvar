import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  registerService(data):Observable<any> {
    console.log(data);
    return this.http.post("https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/data/Users",data)
  }

  loginService(data):Observable<any>{
    console.log(data);
    return this.http.post("https://api.backendless.com/1E43DBD5-EDAF-58B2-FFD9-43A41A8B0F00/04B19478-7A6E-494B-87F9-B0F24A1BE8A9/users/login",{"login":data.email,"password":data.password})
    
  }
}
