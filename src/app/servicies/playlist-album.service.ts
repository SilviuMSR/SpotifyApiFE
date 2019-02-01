import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistAlbumService {

  neededToken = localStorage.getItem('token');
  headers : any;
  defaultStartPage = 1;
  defaultPageSize = 5;

  constructor(private httpClient : HttpClient) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
   }

   private albumURL = 'https://localhost:5001/api/album'
   private playlistAlbumURL = 'https://localhost:5001/api/playlistalbum'

   private getUrl(link : string)
   {
     if(link.indexOf('/') === 0)
     {
       return this.playlistAlbumURL + link;
     }
     else
     {
       return this.playlistAlbumURL + '/' + link;
     }
   }

   displayPlaylistAlbum() {

    var queryParams = '?pageNumber=' + this.defaultStartPage + '&pageSize=' + this.defaultPageSize;

    return this.httpClient.get(this.playlistAlbumURL + queryParams, {headers: this.headers}).pipe(map(map => map));
   }

   getAlbumContent(albumId : number) : Observable<Album> {
    return this.httpClient.get<Album>(this.playlistAlbumURL + '/' + albumId, {headers : this.headers}).pipe(map(map => map));
  }

   displayNextAlbums(nextLink : any) {
    return this.httpClient.get(nextLink, {headers : this.headers}).pipe(map(map => map));
   }

   displayPreviousAlbums(prevLink : any) {
     return this.httpClient.get(prevLink, {headers : this.headers}).pipe(map(map => map));
   }

   deleteAlbumFromPlaylist(album : Album) {
     return this.httpClient.delete(this.playlistAlbumURL + '/' + album.playlistAlbumId, {headers : this.headers}).pipe(map(map => map));
   }

   insertAlbumToPlaylist(albumId : number) {
    return this.httpClient.get(this.albumURL + '/' + albumId, {headers : this.headers}).subscribe((value : any) => {
      this.httpClient.post(this.playlistAlbumURL, {Name : value.name, Type : value.type, ImgUri : value.imgUri}, {headers : this.headers}).subscribe((value : any) => {
      })});
   }

}
