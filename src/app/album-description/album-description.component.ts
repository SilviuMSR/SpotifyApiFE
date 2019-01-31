import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { hostViewClassName } from '@angular/compiler';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { AlbumServiceService } from '../servicies/album-service.service';
import { PlaylistAlbumService } from '../servicies/playlist-album.service';
import { PlaylistTrackService } from '../servicies/playlist-track.service';
import { TrackServiceService } from '../servicies/track-service.service';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.css'],

})
export class AlbumDescriptionComponent implements OnInit {
  
  @Input()
  albumId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService : ApiService,
              private sanitization:DomSanitizer,
              private srv: SpotifyServiceService,
              private albumService: AlbumServiceService,
              private trackService: TrackServiceService,
              private playlistTrackService : PlaylistTrackService,
              private playlistAlbumService: PlaylistAlbumService) { }

  id : number;
  album : Album;
  tracks : Track[] = [];
  backgroundStyle: any;
  audio : any;
  isPlayed : boolean = false;
 

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
    });
    this.getContent();
    this.audio = new Audio();
    console.log(this.id);
  }

  getContent()
  {
    /*this.apiService.get('/album/' + this.id).subscribe((value : any) => {
      this.album = value;
      this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`);
      this.apiService.get('/track').subscribe((t : any) => {
       this.tracks = t;
     })
    })*/
    if(this.id > 1000)
    {
      this.playlistAlbumService.getAlbumContent(this.id).subscribe((val : any) => {
        this.album = val;
        console.log(this.album);
        this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`);
         this.trackService.getTopTracks().subscribe((value : any) => {
         this.tracks = value.values;
       })
      })
    }
    else
    {
      this.albumService.getAlbumContent(this.id).subscribe((val : any) => {
        this.album = val;
        this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`);
        this.trackService.getTopTracks().subscribe((value : any) => {
          this.tracks = value.values;
      })
      })
    }
  }

  playTrack(track: Track)
  {
    this.audio.src = track.previewUrl;
    this.audio.load();
    this.audio.play();
    this.isPlayed = !this.isPlayed;
  }

  stopTrack() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlayed = !this.isPlayed;
  }

  addToPlaylist(track: Track) {
    //this.apiService.post('/playlistTrack', {Name: track.name, PreviewUrl: track.previewUrl, Href:track.href}).subscribe();
    this.playlistTrackService.insertTrackToPlaylist(track).subscribe();
  }

  insertAlbumToPlaylist(album : Album)
  {
    //this.srv.insertAlbumToPlaylist(album.albumId);
    this.playlistAlbumService.insertAlbumToPlaylist(album.albumId);
  }
}
