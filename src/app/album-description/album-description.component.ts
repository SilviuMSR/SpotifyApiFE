import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import * as $ from 'jquery';
import { TrackServiceService } from '../servicies/track-service.service';
import { ToastrService } from 'ngx-toastr';

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
              private playlistAlbumService: PlaylistAlbumService,
              private router: Router,
              private toastrService: ToastrService) { }

  id : number;
  album : Album;
  tracks : Track[] = [];
  backgroundStyle: any;
  audio : any;
  isPlayed : boolean = false;
  selectedRow : Number;
  setClickedRow : Function;
 

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
    });
    this.getContent();
    
    this.audio = new Audio();

    this.setClickedRow = function(index){
      if(this.selectedRow == null)
        this.selectedRow = index;
      else this.selectedRow = null;
    }
  }

  getContent()
  {
    this.albumService.getAlbumContent(this.id).subscribe((value: any) => {
      if(value != null)
      {
        this.album = value;
        this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`);
        this.trackService.getTopTracks().subscribe((val : any) => {
          this.tracks = val.values;
         })
      }
      else {
        this.playlistAlbumService.getAlbumContent(this.id).subscribe((p: any) => {
          this.album = p;
          this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`);
          this.trackService.getTopTracks().subscribe((val : any) => {
            this.tracks = val.values;
          })
        })
      }
    })

  }

  playTrack(track: Track)
  {
    this.audio.src = track.previewUrl;
    this.audio.load();
    this.audio.play();
    this.isPlayed = !this.isPlayed;
  }

  stopTrack(track: Track) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlayed = !this.isPlayed;
  }

  addToPlaylist(track: Track) {
    //this.apiService.post('/playlistTrack', {Name: track.name, PreviewUrl: track.previewUrl, Href:track.href}).subscribe();
    this.playlistTrackService.insertTrackToPlaylist(track).subscribe();
    this.toastrService.success("Successfully added to playlist!");
  }

  insertAlbumToPlaylist(album : Album)
  {
    //this.srv.insertAlbumToPlaylist(album.albumId);
    this.playlistAlbumService.insertAlbumToPlaylist(album.albumId);
    this.toastrService.success("Successfully added to playlist!");
  }
}
