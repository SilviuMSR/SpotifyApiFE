import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from '../models/trackModel';
import { TrackServiceService } from '../servicies/track-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Artist } from '../models/artistModel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-track-description',
  templateUrl: './track-description.component.html',
  styleUrls: ['./track-description.component.css']
})
export class TrackDescriptionComponent implements OnInit {

  @Input()
  trackId : number;

  constructor(private activatedRoute: ActivatedRoute,
    private trackService : TrackServiceService,
    private sanitization:DomSanitizer,
    private toastr: ToastrService) { }

    id : number;
    track : Track;
    backgroundStyle : any;
    audio : any;
    isPlayed : boolean = true;

    artistToAdd: Artist;
    artistname: string;
    artisturi: string;

    loaded: boolean = false;
    link: string;

    ngOnInit() {
      this.activatedRoute.params.subscribe( params => {
        this.id = params['id']
      });
      this.getContent(this.id);
      this.waitFunction();

      this.audio = new Audio();
    }

    waitFunction() {
      setTimeout(()=>{ 
        this.loaded = true;
      }, 1000);
    }

    getContent(id : number)
    {
      this.trackService.getTrackContent(id).subscribe((value : any) => {
        this.track = value;
        this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.track.href})`);
        this.playTrack(this.track); 
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
      this.isPlayed = false;
    }

    createArtistToTrack() {
      this.artistToAdd = {
        name: this.artistname,
        imgUri: this.artisturi
      };
      this.trackService.insertArtistToTrack(this.id, this.artistToAdd).subscribe((value: any) => {
        if(value != null) this.toastr.success("Artist added successfully!");
      });
    }


}
