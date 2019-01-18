import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import { Artist } from '../models/artistModel';
import { Track } from '../models/trackModel';

@Component({
  selector: 'app-artistdescription',
  templateUrl: './artistdescription.component.html',
  styleUrls: ['./artistdescription.component.css']
})
export class ArtistdescriptionComponent implements OnInit {

  @Input()
  artistId : string;

  constructor(private activatedRoute: ActivatedRoute,
    private apiService : ApiService) { }

  id : string;
  artist : Artist;
  tracks : Track[];

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
        console.log(this.tracks)
      })
    })
  }  

}
