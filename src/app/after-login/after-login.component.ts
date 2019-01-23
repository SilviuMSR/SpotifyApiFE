import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';
import { LoginService } from '../servicies/login.service';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import * as $ from 'jquery';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {
  
  topArtists : Artist[];
  topAlbums : Album[];
  topTracks : Track[];

  albumOption : boolean = false;
  artistOption : boolean = false;
  trackOption : boolean = false;

  savedAlbums : Album[];
  savedTracks : Track[];
  savedArtists : Artist[];

  playlistAlbums : Album[] = [];
  playlistTracks : Track[] = [];
  playlistArtists : Artist[] = [];

  neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDgyMzc1NDgsImV4cCI6MTU0ODMyMzk0OCwiaWF0IjoxNTQ4MjM3NTQ4fQ._kSOAN36ibMIaaSjto4CYggoRjtbm8roAwqciiMLJ2L9nXUbRIzpTja3kGjv6mPqbZ-a7emjpRtCD_nLnl0KJA";
  
  constructor(
    private loginService: LoginService,
    private spotifyService: SpotifyServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService : ApiService
    ) {
      
    }

    ngOnInit() {
      //this.getRecGenres();
     this.getTopArtists();
     this.getTopAlbums();
     this.getTopTracks();

      $("#slideshow > div:gt(0)").hide();

      setInterval(function() {
        $('#slideshow > div:first')
          .fadeOut(1000)
          .next()
          .fadeIn(1000)
          .end()
          .appendTo('#slideshow');
      }, 3000);

      $("#slideshow1 > div:gt(0)").hide();

      setInterval(function() {
        $('#slideshow1 > div:first')
          .fadeOut(1000)
          .next()
          .fadeIn(1000)
          .end()
          .appendTo('#slideshow1');
      }, 3000);

      $("#slideshow2 > div:gt(0)").hide();

      setInterval(function() {
        $('#slideshow2 > div:first')
          .fadeOut(1000)
          .next()
          .fadeIn(1000)
          .end()
          .appendTo('#slideshow2');
      }, 3000);
    }
  
    getTopArtists(){

      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.neededToken
      });

      this.apiService.get('/artist', {headers: headers}).subscribe((value : any) => {
        this.topArtists = value;
        console.log(this.topArtists);
      });
    }
  
    getTopAlbums(){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.neededToken
      });
      this.apiService.get('/album', {headers: headers}).subscribe((value : any) => {
        this.topAlbums = value;
        console.log(this.topAlbums);
      })
    }
  
    getTopTracks(){
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.neededToken
      });
      this.apiService.get('/track', {headers: headers}).subscribe((value : any) => {
        this.topTracks = value;
        console.log(this.topTracks);
      })
    }
  
    generateAlbumContent(album : Album)
    {
      this.router.navigate(['albumdescription/' + album.albumId]);
    }
  
    generateArtistContent(artist : Artist)
    {
      this.router.navigate(['artistdescription/' + artist.id]);
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

    displayPlaylistAlbums()
    {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.neededToken
      });

      this.apiService.get('/playlistalbum', {headers : headers}).subscribe((value : any) => {
        
        if(this.playlistAlbums.length == 0)
        {
          for(var i = 0; i < value.length; i++)
          {
            if(value[i].imgUri != null)
            {
              this.playlistAlbums.unshift(value[i]);
            }
          }
        }
      })
    }

}
