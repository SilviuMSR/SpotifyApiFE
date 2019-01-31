import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Track } from '../models/trackModel';

@Injectable({
  providedIn: 'root'
})
export class PlaylistTrackService {

  neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMDAyIiwidW5pcXVlX25hbWUiOiJTaWx2aXUxMjMiLCJuYmYiOjE1NDg5MjMwMzYsImV4cCI6MTU0OTAwOTQzNiwiaWF0IjoxNTQ4OTIzMDM2fQ.TPgcRDC3Jn4H9j56GE2ceZKTkCUk6YNBiJ0JqQN0SKUnhzCnCtFqNkVLobvTFtd6TlHVgvCLE4wt9UIMEfB7Yw";
  headers : any;
  defaultStartPage = 1;
  defaultPageSize = 5;

  constructor(private httpClient : HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

   private playlistTrackURL = 'https://localhost:5001/api/playlisttrack'

   private getUrl(link : string)
   {
     if(link.indexOf('/') === 0)
     {
       return this.playlistTrackURL + link;
     }
     else
     {
       return this.playlistTrackURL + '/' + link;
     }
   }

   displayPlaylistTrack() {

    var queryParams = '?pageNumber=' + this.defaultStartPage + '&pageSize=' + this.defaultPageSize;

    return this.httpClient.get(this.playlistTrackURL + queryParams, {headers: this.headers}).pipe(map(map => map));
   }

   displayNextTracks(nextLink : any) {
    return this.httpClient.get(nextLink, {headers : this.headers}).pipe(map(map => map));
   }

   displayPreviousTracks(prevLink : any) {
     return this.httpClient.get(prevLink, {headers : this.headers}).pipe(map(map => map));
   }

   deleteTrackFromPlaylist(track : Track) {
     return this.httpClient.delete(this.playlistTrackURL + '/' + track.playlistTrackId, {headers : this.headers}).pipe(map(map => map));
   }

   insertTrackToPlaylist(track : Track) {
    return this.httpClient.post(this.playlistTrackURL, {Name: track.name, PreviewUrl: track.previewUrl, Href:track.href}, {headers : this.headers}).pipe(map(map => map));
   }

}
