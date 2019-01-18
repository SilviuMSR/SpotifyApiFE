import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.css']
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
        this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`)
        console.log(this.backgroundStyle)
      })
    })
  }

}
