import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccessControlGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
      const loggedUser = this.authService.getUserFromStorage();
      console.log(loggedUser);
      
      if (loggedUser.role != 'organisation') {
        this.router.navigate(['/offers']);
  
        return false;
      }
  
      return true;
  }
  
}
