import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './servicies/login.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { SpotifyServiceService } from './servicies/spotify-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(localStorage.getItem('token') == null)
    {
      console.log('nu');
      this.router.navigate(['login']);
      return false;
    }
  
      
      return true;
    
  }
}
