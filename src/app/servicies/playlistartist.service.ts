import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Artist } from '../models/artistModel';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PlaylistartistService {

  neededToken = localStorage.getItem('token');
  headers : any;
  defaultStartPage = 1;
  defaultPageSize = 5;

  constructor(private httpClient : HttpClient,
    private toastr: ToastrService) {
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

    var queryParams = '?username=' + localStorage.getItem('username') + '&pageNumber=' + this.defaultStartPage + '&pageSize=' + this.defaultPageSize;

    return this.httpClient.get(this.playlistArtistURL + queryParams, {headers: this.headers}).pipe(map(map => map));
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
      this.httpClient.post(this.playlistArtistURL, {Name : value.name, UserName: localStorage.getItem('username'),  ImgUri : value.imgUri}, {headers : this.headers}).subscribe((value : any) => {
        this.toastr.success("Successfully added to playlist!");
      },
      err => {
        if(err) {
          this.toastr.error("This artist already exist in your playlist!");
        }
      })});
   }

}
