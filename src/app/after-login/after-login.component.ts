import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';
import { LoginService } from '../servicies/login.service';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {
  
  topArtists : Artist[];
  topAlbums : Album[];
  topTracks : Track[];

  constructor(
    private loginService: LoginService,
    private spotifyService: SpotifyServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService : ApiService
    ) { }

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
      this.apiService.get('/artist').subscribe((value : any) => {
        this.topArtists = value;
        console.log(this.topArtists);
      })
    }
  
    getTopAlbums(){
      this.apiService.get('/album').subscribe((value : any) => {
        this.topAlbums = value;
        console.log(this.topAlbums);
      })
    }
  
    getTopTracks(){
      this.apiService.get('/track').subscribe((value : any) => {
        this.topTracks = value;
        console.log(this.topTracks);
      })
    }
  
    generateAlbumContent(album : Album)
    {
      this.router.navigate(['albumdescription/' + album.id]);
    }
  
    generateArtistContent(artist : Artist)
    {
      this.router.navigate(['artistdescription/' + artist.id]);
    }
  
    generateTrackContent(track : Track)
    {
      this.router.navigate(['trackdescription/' + track.id]);
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

}
