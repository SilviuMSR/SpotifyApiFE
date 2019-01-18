import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';
import { LoginService } from '../servicies/login.service';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../servicies/api.service';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {

  searchAlbum : Album;
  searchTrack : Track;
  searchArtist : Artist;

  albumToSearch : string;
  artistToSearch : string;
  trackToSearch : string;
  
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
  
    getAlbumByName()
    {
      this.apiService.get('/album/byName/' + this.albumToSearch).subscribe((value : any) => {
        this.searchAlbum = value;
        this.router.navigate(['albumdescription/' + this.searchAlbum[0].id]);
      })
    }
  
    getArtistByName()
    {
      this.apiService.get('/artist/byName/' + this.artistToSearch).subscribe((value : any) => {
        this.searchArtist = value;
        this.router.navigate(['artistdescription/' + this.searchArtist[0].id]);
      })
    }
  
    getTrackByName()
    {
      this.apiService.get('/track/byName/' + this.trackToSearch).subscribe((value : any) => {
        this.searchTrack = value;
        this.router.navigate(['trackdescription/' + this.searchTrack[0].id]);
      })
    }

}
