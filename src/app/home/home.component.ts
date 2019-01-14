import { Component, OnInit, HostListener } from '@angular/core';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { Genres } from '../models/genresModel';
import { Track } from '../models/trackModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../models/artistModel';
import { LoginService } from '../servicies/login.service';
import { SeedAndTracks } from '../models/seedAndTracks';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  genres: Genres;
  allTracks: Track[];
  artist: Artist;

  constructor(
    private loginService: LoginService,
    private spotifyService: SpotifyServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }


  ngOnInit() {
    if (!this.isLoggedIn()) {
      this.loginService.login();
    }
    this.getRecGenres();
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
