import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../models/artistModel';
import { Track } from '../models/trackModel';
import { DomSanitizer } from '@angular/platform-browser';
import { ArtistServiceService } from '../servicies/artist-service.service';
import { TrackServiceService } from '../servicies/track-service.service';
import { PlaylistTrackService } from '../servicies/playlist-track.service';
import { PlaylistartistService } from '../servicies/playlistartist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-artistdescription',
  templateUrl: './artistdescription.component.html',
  styleUrls: ['./artistdescription.component.css']
})
export class ArtistdescriptionComponent implements OnInit {

  @Input()
  artistId : string;

  constructor(private activatedRoute: ActivatedRoute,
    private artistService : ArtistServiceService,
    private trackService : TrackServiceService,
    private playlistTrackService : PlaylistTrackService,
    private playlistArtistService : PlaylistartistService,
    private sanitization:DomSanitizer,
    private toastrService: ToastrService) { }

  id : string;
  artist : Artist;
  tracks : Track[];
  backgroundStyle: any;
  audio : any;
  isPlayed : boolean = false;
  selectedRow : Number;
  setClickedRow : Function;

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    });
    this.audio = new Audio();

    this.getContent();

    this.setClickedRow = function(index){
      if(this.selectedRow == null)
        this.selectedRow = index;
      else this.selectedRow = null;
    }
  }


  getContent()
  {
    this.artistService.getArtist(this.id).subscribe((value : any) => {
      this.artist = value;
      console.log(value);
      this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.artist.imgUri})`)
      this.trackService.getTopTracks().subscribe((val : any) => {
        this.tracks = val.values;
      })
    })
  }
  
  addToPlaylist(track: Track) {
    this.playlistTrackService.insertTrackToPlaylist(track).subscribe((value: any) => {
      console.log(value);
      this.toastrService.success("Successfully added to playlist!");
    },
    err => {
      if(err) {
        this.toastrService.error("This track already exist in your playlist!");
      }
    });
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

  insertArtistToPlaylist(artist : Artist)
  {
    this.playlistArtistService.insertArtistToPlaylist(artist.artistId);
  }


}
