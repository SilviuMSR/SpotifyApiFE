import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './servicies/login.service';
import { UserService } from './servicies/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      const roles = next.data['roles'] as Array<string>;
      if(roles) {
        const match = this.userService.roleMatch(roles);
        if(match) {
          return true;
        }
        else 
        {
          this.router.navigate(['login']);
          return false;
        }
      }

      if(localStorage.getItem('username') != null)
      {
        return true;
      }

      return false;
  }
}
