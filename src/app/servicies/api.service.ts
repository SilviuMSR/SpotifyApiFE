import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDg3NDYzMDcsImV4cCI6MTU0ODgzMjcwNywiaWF0IjoxNTQ4NzQ2MzA3fQ.XKMKN1zZdKKY4g1uLapVZCKV-tx4J3lEC-YQcYMWo2eMe5t50Q590TdVhL6MLi5bhQFnBLEtPWLHT_N3zz7N_g";
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
