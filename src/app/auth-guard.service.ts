import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public router: Router) {

   }
   canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
     if(localStorage.getItem("user-token")!=null){
      return true;
     }
     else{
     this.router.navigateByUrl("/login");
     return false;
     }
   }

}
