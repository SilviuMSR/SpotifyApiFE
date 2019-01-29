import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';
import { hostViewClassName } from '@angular/compiler';

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
              private sanitization:DomSanitizer) { }

  id : string;
  album : Album;
  tracks : Track[];
  backgroundStyle: any;
  audio : any;
  isPlayed : boolean = false;
 

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
    });

    this.getContent(this.id);
    this.audio = new Audio();
  
  }

  getContent(id : string)
  {
    this.apiService.get('/album/' + id).subscribe((value : any) => {
      this.album = value;
      this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`);
      this.apiService.get('/track').subscribe((t : any) => {
        this.tracks = t;
        console.log(this.tracks);
      })
    })
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
    this.apiService.post('/playlistTrack', {Name: track.name, PreviewUrl: track.previewUrl, Href:track.href}).subscribe();
  }

  

}
