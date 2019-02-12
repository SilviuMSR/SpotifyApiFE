import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicies/user.service';
import { User } from '../models/userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  user: User;

  constructor(
    private userService: UserService) {
  }
  
  ngOnInit() {
    
  }

  loginUser() {

    this.user = {
      username: this.username,
      password: this.password,
      href: 'here should be a href',
    };

    this.userService.loginUser(this.user);
  }
}
