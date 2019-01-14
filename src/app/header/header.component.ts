import { Component, OnInit } from '@angular/core';
import { SpotifyServiceService } from 'src/app/servicies/spotify-service.service';
import { User } from 'src/app/models/userModel';
import { LoginService } from '../servicies/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    private spotifyService: SpotifyServiceService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.user) {
      this.spotifyService.getUserDetails().subscribe( user => {
        this.user = user;
      });
    }
  }

  isAuthenticated(): boolean {
    return this.loginService.isAuthenticated();
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigate(['']);
  }
}
