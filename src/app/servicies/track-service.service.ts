import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Track } from '../models/trackModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackServiceService {

  neededToken = localStorage.getItem('token');
  headers : any;

  constructor(private httpClient : HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

   private trackURL = 'https://localhost:5001/api/track'

   private getUrl(link : string)
   {
     if(link.indexOf('/') === 0)
     {
       return this.trackURL + link;
     }
     else
     {
       return this.trackURL + '/' + link;
     }
   }

   getTopTracks() : Observable<Track[]>{
     return this.httpClient.get<Track[]>(this.trackURL, {headers : this.headers}).pipe(map(map => map))
   }

   getTrackContent(trackId : number) {
     return this.httpClient.get(this.trackURL + '/' + trackId, {headers : this.headers}).pipe(map(map => map));
   }

   getTrackByPage(pageNumber : number) {
    var queryParam = '?pageNumber=' + pageNumber + '&pageSize=5';
    return this.httpClient.get(this.trackURL + queryParam, {headers : this.headers}).pipe(map(map => map));
  }
}