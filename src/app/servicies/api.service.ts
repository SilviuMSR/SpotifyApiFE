import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient) { }

  private URL = 'https://localhost:5001/api';

  post(link : string, body : any, options? : any)
  {
    return this.httpClient.post(this.getUrl(link), body, options);
  }

  get(link : string, options? : any)
  {
    return this.httpClient.get(this.getUrl(link), options);
  }

  delete(link : string, options? : any)
  {
    return this.httpClient.delete(this.getUrl(link), options);
  }

  put(link : string, body : any, options? : any)
  {
    return this.httpClient.post(this.getUrl(link), body, options);
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
