import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicies/user.service';
import { User } from '../models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  username: string;
  password: string;
  href: string;
  user: User;

  registerUser() {
    this.user = {
      username: this.username,
      password: this.password,
      href: 'here should be a href'
    };

    this.userService.registerUser(this.user).subscribe(() => {
      this.router.navigate(['login']);
      alert('Your account was successfuly created!')
    },
    err => {
      if (err.error[0].code == "DuplicateUserName") {
        alert('This account already exist');
      }
      else if(err.error[0].code == "PasswordTooShort")
      {
        alert('You must insert a longer password');
      }
    })
  }

}
