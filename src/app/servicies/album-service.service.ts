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

  neededToken = localStorage.getItem('token');
  headers : any;

  constructor(private httpClient : HttpClient) {
    console.log(localStorage.getItem('token'));
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

   getByName(albumName: string) {
    var queryParam = '?searchQuery=' + albumName;
    return this.httpClient.get(this.albumURL + queryParam, {headers : this.headers}).pipe(map(map => map));
   }

   insertAlbum(album: Album) {
     return this.httpClient.post(this.albumURL, {Name: album.name, Type: album.type, ImgUri: album.imgUri} ,{headers: this.headers}).pipe(map(map => map));
   }

   insertTrackToAlbum(id: number, track: Track) {
      return this.httpClient.patch(this.albumURL + '/' + id + '/track', {Name: track.name, Href: track.href, PreviewUrl: track.previewUrl}, {headers: this.headers}).pipe(map(map => map));
   }

}
