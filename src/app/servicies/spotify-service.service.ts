import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';
import { Genres } from '../models/genresModel';
import { User } from '../models/userModel';
import { SeedAndTracks } from '../models/seedAndTracks';
import { IDataService } from './dataService.interface';
import { Song } from '../models/Song';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyServiceService implements IDataService {

  private clientId = 'af3e36e09ff5400388a7118ae635f238';
  private redirectUri = 'http://localhost:4200';
  private spotifyAuthorizeUrl = 'https://accounts.spotify.com/authorize';
  private spotifyBaseApiUrl = 'https://api.spotify.com/v1/';
  neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDgyMzc1NDgsImV4cCI6MTU0ODMyMzk0OCwiaWF0IjoxNTQ4MjM3NTQ4fQ._kSOAN36ibMIaaSjto4CYggoRjtbm8roAwqciiMLJ2L9nXUbRIzpTja3kGjv6mPqbZ-a7emjpRtCD_nLnl0KJA";

  constructor(
    private http: HttpClient,
    private httpService : ApiService
  ) { }


  insertAlbumToPlaylist(albumId : number)
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });

    this.httpService.get('/album/' + albumId, {headers : headers}).subscribe((value : any) => {
      this.httpService.post('/playlistalbum', {Name : value.name, Type : value.type, ImgUri : value.imgUri}, {headers : headers}).subscribe((value : any) => {
        console.log(value);
      });
    })
  }


  getUserDetails(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const url = this.spotifyBaseApiUrl + 'me';

    return this.http.get<User>(url, {headers: headers}).pipe(map(user => user));
  }



  getTracks(ids: string): Observable<Track[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const endPoint = this.spotifyBaseApiUrl + 'tracks/?ids=' + ids;


    return this.http.get<Track[]>(endPoint, { headers: headers }).pipe(map(res => res));
  }



  getArtistTopTracks(id: string): Observable<Song> {
    const headers = new HttpHeaders({
      'Authorization' : 'Bearer ' + localStorage.getItem('token')
    });

    const endPoint = this.spotifyBaseApiUrl + 'artists/' + id + '/top-tracks' + '?market=from_token';

    return this.http.get<Song>(endPoint, { headers: headers}).pipe(map(res => res));
  }



  getArtists(searchString: string, type = 'artist'): Observable<Artist[]> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const endPoint = this.spotifyBaseApiUrl + 'me/top/tracks';

    return this.http.get<Artist[]>(endPoint, { headers: headers }).pipe(map(res => res));

  }




  getRecomandations(genres: Genres): Observable<SeedAndTracks> {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    const endPoint = this.spotifyBaseApiUrl + 'recommendations?' +
    'seed_genres=' + genres.genres[0] + ',' + genres.genres[1] + ',' + genres.genres[2] + '&limit=50';

    return this.http.get<SeedAndTracks>(endPoint, { headers: headers }).pipe(map(recom => recom));
  }



  getGenres(): Observable<Genres> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    const endPoint = this.spotifyBaseApiUrl + 'recommendations';

    return this.http.get<Genres>(endPoint + '/available-genre-seeds', { headers: headers }).pipe(map(genres => {
      console.log(genres);
      return genres;
    }));
  }


  

  authorizeLogin(): void {
    const scopes = 'user-top-read user-read-recently-played playlist-read-collaborative user-library-modify';
    const fullAuthorizeLink = this.spotifyAuthorizeUrl + '?response_type=token' + '&client_id=' + this.clientId +
      '&redirect_uri=' + this.redirectUri +
      '&scope=' + scopes;
    location.href = fullAuthorizeLink;
  }

}
