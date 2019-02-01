import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHeaderResponse } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { User } from '../models/userModel';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

  neededToken = localStorage.getItem('token');
  headers : any;

  private userURL = 'https://localhost:5001/api/user'

  registerUser(user : User) {
    return this.httpClient.post(this.userURL, {UserName: user.username, Password: user.password, Href: user.href}, {headers : this.headers, observe: 'response'}).pipe(map(map => map));
  }

  loginUser(user : User){
    return this.httpClient.post(this.userURL + '/login', {Username: user.username, Password: user.password}, {headers : this.headers, observe: 'response'}).pipe(map(map => map));
  }

  
}
