import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicies/user.service';
import { User } from '../models/userModel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit() {
  }

  username: string;
  password: string;
  useremail: string;
  href: string;
  user: User;

  registerUser() {
    this.user = {
      username: this.username,
      password: this.password,
      email: this.useremail,
      href: 'here should be a href'
    };

    this.userService.registerUser(this.user).subscribe(() => {
      this.router.navigate(['login']);
      this.toastrService.success("Your account was successfully created!")
    },
    err => {
      if (err.error[0].code == "DuplicateUserName") {
        this.toastrService.error('This account already exist');
      }
      else if(err.error[0].code == "PasswordTooShort")
      {
        this.toastrService.error('You must insert a longer password');
      }
    })
  }

}
