import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Artist } from '../models/artistModel';

@Injectable({
  providedIn: 'root'
})
export class PlaylistartistService {

  neededToken = localStorage.getItem('token');
  headers : any;
  defaultStartPage = 1;
  defaultPageSize = 5;

  constructor(private httpClient : HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

   private artistURL = 'https://localhost:5001/api/artist'
   private playlistArtistURL = 'https://localhost:5001/api/playlistartist'

   private getUrl(link : string)
   {
     if(link.indexOf('/') === 0)
     {
       return this.playlistArtistURL + link;
     }
     else
     {
       return this.playlistArtistURL + '/' + link;
     }
   }

   displayPlaylistArtist() {

    var queryParams = '?pageNumber=' + this.defaultStartPage + '&pageSize=' + this.defaultPageSize;

    return this.httpClient.get(this.playlistArtistURL, {headers: this.headers}).pipe(map(map => map));
   }

   getArtistContent(artistId : number) : Observable<Artist> {
    return this.httpClient.get<Artist>(this.playlistArtistURL + '/' + artistId, {headers : this.headers}).pipe(map(map => map));
  }

   displayNextArtists(nextLink : any) {
    return this.httpClient.get(nextLink, {headers : this.headers}).pipe(map(map => map));
   }

   displayPreviousArtists(prevLink : any) {
     return this.httpClient.get(prevLink, {headers : this.headers}).pipe(map(map => map));
   }

   deleteArtistFromPlaylist(artist : Artist) {
     return this.httpClient.delete(this.playlistArtistURL + '/' + artist.playlistArtistId, {headers : this.headers}).pipe(map(map => map));
   }

   insertArtistToPlaylist(artistId : string) {
    return this.httpClient.get(this.artistURL + '/' + artistId, {headers : this.headers}).subscribe((value : any) => {
      this.httpClient.post(this.playlistArtistURL, {Name : value.name,  ImgUri : value.imgUri}, {headers : this.headers}).subscribe((value : any) => {
      })});
   }

}
