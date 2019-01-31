import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album } from '../models/album';
import { map } from 'rxjs/operators';
import { Track } from '../models/trackModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumServiceService {

  neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMDAyIiwidW5pcXVlX25hbWUiOiJTaWx2aXUxMjMiLCJuYmYiOjE1NDg5MjMwMzYsImV4cCI6MTU0OTAwOTQzNiwiaWF0IjoxNTQ4OTIzMDM2fQ.TPgcRDC3Jn4H9j56GE2ceZKTkCUk6YNBiJ0JqQN0SKUnhzCnCtFqNkVLobvTFtd6TlHVgvCLE4wt9UIMEfB7Yw";
  headers : any;

  constructor(private httpClient : HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

   private albumURL = 'https://localhost:5001/api/album'
   private trackURL = 'https://localhost:5001/api/track'

   album : Album;

   private getUrl(link : string)
   {
     if(link.indexOf('/') === 0)
     {
       return this.albumURL + link;
     }
     else
     {
       return this.albumURL + '/' + link;
     }
   }

   getTopAlbums() : Observable<Album[]> {
     return this.httpClient.get<Album[]>(this.albumURL, {headers : this.headers}).pipe(map(map => map))
   }

   getAlbumContent(albumId : number) : Observable<Album> {
     return this.httpClient.get<Album>(this.albumURL + '/' + albumId, {headers : this.headers}).pipe(map(map => map));
   }

   getAlbumByPage(pageNumber : number) {
     var queryParam = '?pageNumber=' + pageNumber + '&pageSize=5';
     return this.httpClient.get(this.albumURL + queryParam, {headers : this.headers}).pipe(map(map => map));
   }

}
