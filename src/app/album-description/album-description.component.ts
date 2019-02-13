import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { DomSanitizer } from '@angular/platform-browser';
import { AlbumServiceService } from '../servicies/album-service.service';
import { PlaylistAlbumService } from '../servicies/playlist-album.service';
import { PlaylistTrackService } from '../servicies/playlist-track.service';
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
              private sanitization:DomSanitizer,
              private albumService: AlbumServiceService,
              private trackService: TrackServiceService,
              private playlistTrackService : PlaylistTrackService,
              private playlistAlbumService: PlaylistAlbumService,
              private toastrService: ToastrService) { }

  id : number;
  album : Album;
  tracks : Track[] = [];
  backgroundStyle: any;
  audio : any;
  isPlayed : boolean = false;

  trackname: string;
  trackpreview: string;
  trackhref: string;
  trackToAdd: Track; 

  selectedRow : Number;
  setClickedRow : Function;

  ngOnInit() {
    this.tracks = [];
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
        console.log(this.album.tracks.length);
        this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`);
        if(this.album.tracks.length == 0){
          this.trackService.getTopTracks().subscribe((val : any) => {
            this.tracks = val.values;
          })
        }
        else {
          this.tracks = value.tracks;
        }
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
    if(track.previewUrl.length < 30) {
    this.audio.src = decodeURIComponent("../../assets/" + track.previewUrl + ".mp3");
    }
    else {
      this.audio.src = track.previewUrl;
    }
    this.audio.load();
    this.audio.play();
    this.isPlayed = true;
  }

  stopTrack() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlayed = !this.isPlayed;
  }

  addToPlaylist(track: Track) {
    this.playlistTrackService.insertTrackToPlaylist(track).subscribe((value: any) => {
      this.toastrService.success("Successfully added to playlist!");
    },
    err => {
      if(err) {
        this.toastrService.error("This track already exist in your playlist!");
      }
    });
  }

  insertAlbumToPlaylist(album : Album) {
    this.playlistAlbumService.insertAlbumToPlaylist(album.albumId);
  }

  createNewTrack() {
    this.trackToAdd = {
      name: this.trackname,
      href: this.trackhref,
      previewUrl: this.trackpreview
    };
    this.albumService.insertTrackToAlbum(this.id, this.trackToAdd).subscribe((value: any) => {
      console.log(value);
      if(value != null) this.toastrService.success("Track added successfully!");
    });
  }
}
