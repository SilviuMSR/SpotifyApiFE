import { Injectable } from '@angular/core';
import { SpotifyServiceService } from './spotify-service.service';
import { Router } from '@angular/router';
import { ILoginService } from './loginService.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements ILoginService {

  constructor(private ser: SpotifyServiceService, private router: Router) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(): void {
    const beginSplit = window.location.hash.slice('#access_token='.length);
    const beginLen = '#access_token='.length;
    const finalSplit = window.location.hash.slice(beginLen, window.location.hash.length - '&token_type=Bearer&expires_in=3600'.length);
    this.setToken(finalSplit);
  }

  logout(): void {
    localStorage.clear();
  }
}
