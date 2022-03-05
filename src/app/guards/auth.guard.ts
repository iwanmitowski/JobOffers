import { Injectable } from '@angular/core';
import { CanActivate, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){
  }
  
  canActivate(): boolean{
    const loggedUser = this.authService.getUserFromStorage();
    console.log(loggedUser);
    
    if (!loggedUser) {
      console.log(89);
      
      this.router.navigate(['/auth','login']);

      return false;
    }

    return true;
  }
}
