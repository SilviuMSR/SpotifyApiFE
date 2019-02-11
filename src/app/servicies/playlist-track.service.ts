import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Track } from '../models/trackModel';

@Injectable({
  providedIn: 'root'
})
export class PlaylistTrackService {

  neededToken = localStorage.getItem('token');
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

    var queryParams = '?username=' + localStorage.getItem('username') + '&pageNumber=' + this.defaultStartPage + '&pageSize=' + this.defaultPageSize;

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

    return this.httpClient.post(this.playlistTrackURL, {Name: track.name, UserName: localStorage.getItem('username'), PreviewUrl: track.previewUrl, Href:track.href}, {headers : this.headers}).pipe(map(map => map));
   }

}
