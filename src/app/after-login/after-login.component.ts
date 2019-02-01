import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';
import { LoginService } from '../servicies/login.service';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import * as $ from 'jquery';
import { HttpHeaders, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { HttpClientModule, HttpClient} from '@angular/common/http'
import { AlbumServiceService } from '../servicies/album-service.service';
import { TrackServiceService } from '../servicies/track-service.service';
import { ArtistServiceService } from '../servicies/artist-service.service';
import { PlaylistAlbumService } from '../servicies/playlist-album.service';
import { PlaylistTrackService } from '../servicies/playlist-track.service';
import { PlaylistartistService } from '../servicies/playlistartist.service';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../servicies/user.service';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {

  topArtists : Artist[] = [];
  topAlbums : Album[] = [];
  topTracks : Track[] = [];

  albumOption : boolean;
  artistOption : boolean;
  trackOption : boolean;

  savedAlbums : Album[] = [];
  savedTracks : Track[] = [];
  savedArtists : Artist[] = [];

  playlistAlbums : Album[] = [];
  playlistTracks : Track[] = [];
  playlistArtists : Artist[] = [];

  defaultStartPage = 1;
  defaultPageSize = 5;

  playlistAlbumLinks : any;
  playlistTrackLinks : any;
  playlistArtistLinks : any;

  audio : any;
  isPlayed : boolean = false;

  constructor(
    private loginService: LoginService,
    private spotifyService: SpotifyServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService : ApiService,
    private http: HttpClient,
    private albumService: AlbumServiceService,
    private trackService: TrackServiceService,
    private artistService: ArtistServiceService,
    private playlistAlbumService: PlaylistAlbumService,
    private playlistTrackService: PlaylistTrackService,
    private playlistArtistService: PlaylistartistService,
    ) {
      
    }

    ngOnInit() {
     
     this.getTopArtists();
     this.getTopAlbums();
     this.getTopTracks();

     this.audio = new Audio();
     
    }


    getTopArtists(){

      /*this.apiService.get('/artist').subscribe((value : any) => {
        this.topArtists = value;
        console.log(this.topArtists);
      });*/
      this.artistService.getTopArtists().subscribe((value : any) => {
        this.topArtists = value.values;
      })
    }
  
    getTopAlbums(){
      /*this.apiService.get('/album').subscribe((value : any) => {
        this.topAlbums = value.values;
        console.log(this.topAlbums);
      })*/
      this.albumService.getTopAlbums().subscribe((value : any) => {
        this.topAlbums = value.values;
      })
    }
  
    getTopTracks(){
      /*this.apiService.get('/track').subscribe((value : any) => {
        this.topTracks = value;
        console.log(this.topTracks);
      })*/
      this.trackService.getTopTracks().subscribe((value : any) => {
        this.topTracks = value.values;
      })
    }
    
    generateAlbumContent(album : Album)
    {
      if(album.playlistAlbumId != null)
      {
        this.router.navigate(['albumdescription/' + album.playlistAlbumId]);
      }
      else
      {
        this.router.navigate(['albumdescription/' + album.albumId]);
      }
    }
  
    generateArtistContent(artist : Artist)
    {
      this.router.navigate(['artistdescription/' + artist.artistId]);
    }
  
    generateTrackContent(track : Track)
    {
      this.router.navigate(['trackdescription/' + track.trackId]);
    }

    goToAlbums()
    {
      this.router.navigate(['allalbums']);
    }
    
    goToTracks()
    {
      this.router.navigate(['alltracks']);
    }

    goToArtists()
    {
      this.router.navigate(['allartists']);
    }

    setAlbumOption() {
      this.albumOption = true;
      this.trackOption = false;
      this.artistOption = false;
    }

    setTrackOption() {
      this.trackOption = true;
      this.albumOption = false;
      this.artistOption = false;
    }

    setArtistOption()
    {
      this.artistOption = true;
      this.albumOption = false;
      this.trackOption = false;
    }

    displayPlaylistArtists() {
      this.playlistArtistService.displayPlaylistArtist().subscribe((value : any) => {
        this.playlistArtists = value.values;
        this.playlistArtistLinks = value.links;
      })
    }

    displayNextArtists() {
      this.playlistArtistService.displayNextArtists(this.playlistArtistLinks.nextPageLink).subscribe((value : any) => {
        this.playlistArtists = value.values;
        this.playlistArtistLinks = value.links;
      })
    }

    displayPreviousArtists() {
      this.playlistArtistService.displayPreviousArtists(this.playlistArtistLinks.previousPageLink).subscribe((value : any) => {
        this.playlistArtists = value.values;
        this.playlistArtistLinks = value.links;
      })
    }

    deleteArtistFromPlaylist(artist : Artist){
      /*this.apiService.delete('/playlistAlbum/' + album.playlistAlbumId).subscribe((value : any) =>{
        location.reload();
      });*/
      this.playlistArtistService.deleteArtistFromPlaylist(artist).subscribe(() => {
        location.reload();
      })
    }

    displayPlaylistAlbums()
    {
      /*var queryParams = '?pageNumber=' + this.defaultStartPage + '&pageSize=' + this.defaultPageSize;
      
      this.apiService.get('/playlistalbum' + queryParams).subscribe((value : any)  => {
       this.playlistAlbums = value.values;
       this.playlistAlbumLinks = value.links;
      })*/
      this.playlistAlbumService.displayPlaylistAlbum().subscribe((value : any) => {
        this.playlistAlbums = value.values;
        this.playlistAlbumLinks = value.links;
      })
    }

    displayNextAlbums() {   

      /*let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJTaWx2aXUxMiIsIm5iZiI6MTU0ODgzNjIyNiwiZXhwIjoxNTQ4OTIyNjI2LCJpYXQiOjE1NDg4MzYyMjZ9._FKpBU6YwuQ_N0e3uQ500GLimD6MY4pXu2T17FA-Mn0VtW3gqVA0zFQl2WYY_iynh1KCVRWzeu8b43M9z87hHw'
      });

      this.http.get(this.playlistAlbumLinks.nextPageLink, {headers : headers}).subscribe((value : any)  => {
       this.playlistAlbums = value.values;
       this.playlistAlbumLinks = value.links;
      })*/
      this.playlistAlbumService.displayNextAlbums(this.playlistAlbumLinks.nextPageLink).subscribe((value : any) => {
        this.playlistAlbums = value.values;
        this.playlistAlbumLinks = value.links;
      })
    }

    displayPlaylistTracks(){
        /*var queryParams = '?pageNumber=' + this.defaultStartPage + '&pageSize=' + this.defaultPageSize;
      
        this.apiService.get('/playlisttrack' + queryParams).subscribe((value : any)  => {
          this.playlistTracks = value.values;
          this.playlistTrackLinks = value.links;
        })*/
        this.playlistTrackService.displayPlaylistTrack().subscribe((value : any) => {
          this.playlistTracks = value.values;
          this.playlistTrackLinks = value.links;
        })

    }

    displayPreviousAlbums() {
      /*let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJTaWx2aXUxMiIsIm5iZiI6MTU0ODgzNjIyNiwiZXhwIjoxNTQ4OTIyNjI2LCJpYXQiOjE1NDg4MzYyMjZ9._FKpBU6YwuQ_N0e3uQ500GLimD6MY4pXu2T17FA-Mn0VtW3gqVA0zFQl2WYY_iynh1KCVRWzeu8b43M9z87hHw'
      });
      this.http.get(this.playlistAlbumLinks.previousPageLink, {headers : headers}).subscribe((value : any)  => {
       this.playlistAlbums = value.values;
       this.playlistAlbumLinks = value.links;
      })*/
      this.playlistAlbumService.displayPreviousAlbums(this.playlistAlbumLinks.previousPageLink).subscribe((value : any) => {
        this.playlistAlbums = value.values;
        this.playlistAlbumLinks = value.links;
      })
    }

    displayNextTracks() {   
      /*let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJTaWx2aXUxMiIsIm5iZiI6MTU0ODgzNjIyNiwiZXhwIjoxNTQ4OTIyNjI2LCJpYXQiOjE1NDg4MzYyMjZ9._FKpBU6YwuQ_N0e3uQ500GLimD6MY4pXu2T17FA-Mn0VtW3gqVA0zFQl2WYY_iynh1KCVRWzeu8b43M9z87hHw'
      });
      this.http.get(this.playlistTrackLinks.nextPageLink, {headers : headers}).subscribe((value : any)  => {
       this.playlistTracks = value.values;
       this.playlistTrackLinks = value.links;
      })*/
      this.playlistTrackService.displayNextTracks(this.playlistTrackLinks.nextPageLink).subscribe((value : any) => {
        this.playlistTracks = value.values;
        this.playlistTrackLinks = value.links;
      })
    }

    displayPreviousTracks() {
      /*let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJTaWx2aXUxMiIsIm5iZiI6MTU0ODgzNjIyNiwiZXhwIjoxNTQ4OTIyNjI2LCJpYXQiOjE1NDg4MzYyMjZ9._FKpBU6YwuQ_N0e3uQ500GLimD6MY4pXu2T17FA-Mn0VtW3gqVA0zFQl2WYY_iynh1KCVRWzeu8b43M9z87hHw'
      });
      this.http.get(this.playlistTrackLinks.previousPageLink, {headers : headers}).subscribe((value : any)  => {
       this.playlistTracks = value.values;
       this.playlistTrackLinks = value.links;
      })*/
      this.playlistTrackService.displayPreviousTracks(this.playlistTrackLinks.previousPageLink).subscribe((value : any) => {
        this.playlistTracks = value.values;
        this.playlistTrackLinks = value.links;
      })
    }


    deleteAlbumFromPlaylist(album : Album){
      /*this.apiService.delete('/playlistAlbum/' + album.playlistAlbumId).subscribe((value : any) =>{
        location.reload();
      });*/
      this.playlistAlbumService.deleteAlbumFromPlaylist(album).subscribe(() => {
        location.reload();
      })
    }

    deleteTrackFromPlaylist(track : Track)
    {
      /*this.apiService.delete('/playlistTrack/' + track.playlistTrackId).subscribe((value : any) => {
        location.reload();
      })*/
      this.playlistTrackService.deleteTrackFromPlaylist(track).subscribe( () => {
        location.reload();
      });
    }

    playTrack(track: Track)
    {
      this.audio.src = track.previewUrl;
      this.audio.load();
      this.audio.play();
      this.isPlayed = true;
    }
  
    stopTrack() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlayed = false;
    }

}
