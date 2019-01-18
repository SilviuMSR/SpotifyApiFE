import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import { Artist } from '../models/artistModel';
import { Track } from '../models/trackModel';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-artistdescription',
  templateUrl: './artistdescription.component.html',
  styleUrls: ['./artistdescription.component.css']
})
export class ArtistdescriptionComponent implements OnInit {

  @Input()
  artistId : string;

  constructor(private activatedRoute: ActivatedRoute,
    private apiService : ApiService,
    private sanitization:DomSanitizer) { }

  id : string;
  artist : Artist;
  tracks : Track[];
  backgroundStyle: any;

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    });

    this.getContent(this.id);
  }

  getContent(id : string)
  {
    this.apiService.get('/artist/' + id).subscribe((value : any) => {
      this.artist = value;
      this.apiService.get('/track/byArtist/' + id).subscribe((t : any) => {
        this.tracks = t;
        this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.artist.imgUri})`)
        console.log(this.tracks)
      })
    })
  }  

}
