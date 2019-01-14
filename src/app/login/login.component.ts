import { Component, OnInit } from '@angular/core';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { LoginService } from '../servicies/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
    private spotifyService: SpotifyServiceService,
    private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    this.loginService.login();
    this.spotifyService.authorizeLogin();
  }

}
