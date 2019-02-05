import { Component, OnInit } from '@angular/core';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { LoginService } from '../servicies/login.service';
import { Router } from '@angular/router';
import { UserService } from '../servicies/user.service';
import { User } from '../models/userModel';
import { HttpHeaderResponse, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private toastrService: ToastrService) { }

  username: string;
  password: string;
  user: User;
  
  ngOnInit() {
  }

  loginUser() {

    this.user = {
      username: this.username,
      password: this.password,
      href: 'here should be a href'
    };

    this.userService.loginUser(this.user).subscribe((value : any) => {
      localStorage.setItem('token', value.body.token);
      localStorage.setItem('username', this.username);
      console.log(value.body);
      this.toastrService.success("Successfully connected!");
      this.router.navigate(['after']);
    },
    err => {
      if(err.status == 401) {
        this.toastrService.error("Sorry, this account is not existing!");
      }
    });
  }


}
