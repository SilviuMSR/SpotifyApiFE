import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.css']
})
export class AlbumDescriptionComponent implements OnInit {
  
  @Input()
  albumId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private apiService : ApiService) { }

  id : string;
  album : Album;
  tracks : Track[];

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
    });

    this.getContent(this.id);
  
  }

  getContent(id : string)
  {
    this.apiService.get('/album/' + id).subscribe((value : any) => {
      this.album = value;
      this.apiService.get('/track/byAlbum/' + id).subscribe((t : any) => {
        this.tracks = t;
      })
    })
  }

}
