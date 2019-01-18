import { Component, OnInit, HostListener } from '@angular/core';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { Genres } from '../models/genresModel';
import { Track } from '../models/trackModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../models/artistModel';
import { LoginService } from '../servicies/login.service';
import { SeedAndTracks } from '../models/seedAndTracks';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  searchAlbum : Album;
  searchTrack : Track;
  searchArtist : Artist;

  albumToSearch : string;
  artistToSearch : string;
  trackToSearch : string;

  genres: Genres;
  allTracks: Track[];
  artist: Artist;
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
  

  onLogin() {
    this.spotifyService.authorizeLogin();
  }



  getRecGenres() {
    this.spotifyService.getGenres().subscribe(genres => {
      this.getRecomandations(genres);
    });
  }



  getRecomandations(genres) {
    this.spotifyService.getRecomandations(genres).subscribe(res => {
     this.allTracks = res.tracks;
    });
  }



  navigate(track: Track) {
    this.router.navigate(['artistplaylist/' + track.artists[0].id]);
  }



  isLoggedIn() {
    return this.loginService.isAuthenticated();
  }



  @HostListener('window:scroll', [])
  onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.isLoggedIn()) {
        this.getRecGenres();
        window.scrollTo(0, 0);
      }
    }
  }
}
