import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Artist } from '../models/artistModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistServiceService {

  neededToken = localStorage.getItem('token');
  headers : any;

  constructor(private httpClient : HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

   private artistURL = 'https://localhost:5001/api/artist'

   private getUrl(link : string)
   {
     if(link.indexOf('/') === 0)
     {
       return this.artistURL + link;
     }
     else
     {
       return this.artistURL + '/' + link;
     }
   }

   getTopArtists()
   {
     return this.httpClient.get<Artist[]>(this.artistURL, {headers : this.headers}).pipe(map(map => map))
   }

   getArtistByPage(pageNumber : number) {
    var queryParam = '?pageNumber=' + pageNumber + '&pageSize=5';
    return this.httpClient.get(this.artistURL + queryParam, {headers : this.headers}).pipe(map(map => map));
  }

  getArtist(id : string) {
    return this.httpClient.get(this.artistURL + '/' + id, {headers : this.headers}).pipe(map(map => map));
  }

  getByName(artistName: string) {
    var queryParam = '?searchQuery=' + artistName;
    return this.httpClient.get(this.artistURL + queryParam, {headers : this.headers}).pipe(map(map => map));
   }

}
