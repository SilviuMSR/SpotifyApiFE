import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJTaWx2aXUxMiIsIm5iZiI6MTU0ODgzNjIyNiwiZXhwIjoxNTQ4OTIyNjI2LCJpYXQiOjE1NDg4MzYyMjZ9._FKpBU6YwuQ_N0e3uQ500GLimD6MY4pXu2T17FA-Mn0VtW3gqVA0zFQl2WYY_iynh1KCVRWzeu8b43M9z87hHw";
  headers : any;


  constructor(private httpClient : HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

  private URL = 'https://localhost:5001/api';

  post(link : string, body : any, options? : any)
  {
    return this.httpClient.post(this.getUrl(link), body, {headers : this.headers});
  }

  get(link : string, options? : any)
  {
    return this.httpClient.get(this.getUrl(link), {headers : this.headers});
  }

  delete(link : string, options? : any)
  {
    return this.httpClient.delete(this.getUrl(link), {headers : this.headers});
  }

  put(link : string, body : any, options? : any)
  {
    return this.httpClient.post(this.getUrl(link), body, {headers : this.headers});
  }

  private getUrl(link : string)
  {
    if(link.indexOf('/') === 0)
    {
      return this.URL + link;
    }
    else
    {
      return this.URL + '/' + link;
    }
  }
}
