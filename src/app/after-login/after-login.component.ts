import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {
  
  topArtists : Artist[];
  topAlbums : Album[];
  topTracks : Track[];

  albumOption : boolean;
  artistOption : boolean;
  trackOption : boolean;

  savedAlbums : Album[];
  savedTracks : Track[];
  savedArtists : Artist[];

  playlistAlbums : Album[] = [];
  playlistTracks : Track[] = [];
  playlistArtists : Artist[] = [];

  defaultStartPage = 1;
  defaultPageSize = 5;

  playlistAlbumLinks : any;

  constructor(
    private loginService: LoginService,
    private spotifyService: SpotifyServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService : ApiService,
    private http: HttpClient
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

      this.apiService.get('/artist').subscribe((value : any) => {
        this.topArtists = value;
        console.log(this.topArtists);
      });
    }
  
    getTopAlbums(){
      this.apiService.get('/album').subscribe((value : any) => {
        this.topAlbums = value.values;
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
      if(album)
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
      var queryParams = '?pageNumber=' + this.defaultStartPage + '&pageSize=' + this.defaultPageSize;
      
      this.apiService.get('/playlistalbum' + queryParams).subscribe((value : any)  => {
       this.playlistAlbums = value.values;
       this.playlistAlbumLinks = value.links;
      })

    }

    displayNextAlbums() {   
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDg3NDYzMDcsImV4cCI6MTU0ODgzMjcwNywiaWF0IjoxNTQ4NzQ2MzA3fQ.XKMKN1zZdKKY4g1uLapVZCKV-tx4J3lEC-YQcYMWo2eMe5t50Q590TdVhL6MLi5bhQFnBLEtPWLHT_N3zz7N_g'
      });
      this.http.get(this.playlistAlbumLinks.nextPageLink, {headers : headers}).subscribe((value : any)  => {
       this.playlistAlbums = value.values;
       this.playlistAlbumLinks = value.links;
      })
    }

    displayPreviousAlbums() {
      let headers = new HttpHeaders({
        'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDg3NDYzMDcsImV4cCI6MTU0ODgzMjcwNywiaWF0IjoxNTQ4NzQ2MzA3fQ.XKMKN1zZdKKY4g1uLapVZCKV-tx4J3lEC-YQcYMWo2eMe5t50Q590TdVhL6MLi5bhQFnBLEtPWLHT_N3zz7N_g'
      });
      this.http.get(this.playlistAlbumLinks.previousPageLink, {headers : headers}).subscribe((value : any)  => {
       this.playlistAlbums = value.values;
       this.playlistAlbumLinks = value.links;
      })
    }


    displayPlaylistTracks(){
      this.apiService.get('/playlistTrack').subscribe((value : any) => {
        if(this.playlistTracks.length == 0)
        {
          for(var i = 0; i < value.length; i++)
          {
            if(value[i].href != null)
            {
              this.playlistTracks.unshift(value[i]);
            }
          }
        }
      })
    }

    deleteAlbumFromPlaylist(album : Album){
      this.apiService.delete('/playlistAlbum/' + album.playlistAlbumId).subscribe((value : any) =>{
        location.reload();
      });
    }

    deleteTrackFromPlaylist(track : Track)
    {
      this.apiService.delete('/playlistTrack/' + track.playlistTrackId).subscribe((value : any) => {
        location.reload();
      })
    }


}
