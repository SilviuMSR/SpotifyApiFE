import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { User } from '../models/userModel';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private toastr: ToastrService) {
    this.neededToken = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

  neededToken: any;
  headers : any;
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  private userURL = 'https://localhost:5001/api/user'
  private requestURL = 'https://localhost:5001/api/request'


  registerUser(user : User) {
    return this.httpClient.post(this.userURL, {UserName: user.username, Password: user.password, Email: user.email, Href: user.href}, {headers : this.headers, observe: 'response'}).pipe(map(map => map));
  }

  registerAdmin(user : User) {
    return this.httpClient.post(this.userURL + '/admin', {UserName: user.username, Password: user.password, Email: user.email}, {headers : this.headers, observe: 'response'}).pipe(map(map => map));
  }

  loginUser(user : User){
    return this.httpClient.post(this.userURL + '/login', {Username: user.username, Password: user.password}, {headers : this.headers, observe: 'response'}).subscribe((value: any) => {
      localStorage.setItem('token', value.body.token);
      this.neededToken = localStorage.getItem('token');
      localStorage.setItem('username', user.username);
      this.router.navigate(['after']);
      this.toastr.success('Successfully logged in!');
    },
    err => {
      if(err.status == 401) {
        this.toastr.error("Sorry but this account is not existing!");
      }
    })
  }  

  getRequests() {
    return this.httpClient.get(this.requestURL, {headers: this.headers}).pipe(map(map => map));
  }

  getAllUsers() {
    return this.httpClient.get(this.userURL, {headers: this.headers}).pipe(map(map => map));
  }

  displayNextUsers(nextLink: any) {
    return this.httpClient.get(nextLink, {headers : this.headers}).pipe(map(map => map));
  }

  displayPreviousUsers(previousLink: any) {
    return this.httpClient.get(previousLink, {headers : this.headers}).pipe(map(map => map));
  }

  displayNextRequests(nextLink : any) {
    return this.httpClient.get(nextLink, {headers : this.headers}).pipe(map(map => map));
   }

   displayPreviousRequests(prevLink : any) {
    return this.httpClient.get(prevLink, {headers : this.headers}).pipe(map(map => map));
   }

  roleMatch(rolee): boolean {
    if(this.neededToken == null)
    {
      return false;
    }
    let isMatch = false;
    this.decodedToken = this.jwtHelper.decodeToken(this.neededToken)
    const userRole = this.decodedToken.role as Array<string>;
    rolee.forEach(element => {
      if(userRole.includes(element)) {
        isMatch = true;
        return;
      }
    });

    return isMatch;
    
  }

}
