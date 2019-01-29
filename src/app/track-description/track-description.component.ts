import { Component, OnInit, Input } from '@angular/core';
import { AlbumDescriptionComponent } from '../album-description/album-description.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import { Track } from '../models/trackModel';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-track-description',
  templateUrl: './track-description.component.html',
  styleUrls: ['./track-description.component.css']
})
export class TrackDescriptionComponent implements OnInit {

  @Input()
  trackId : number;

  constructor(private activatedRoute: ActivatedRoute,
    private apiService : ApiService) { }

    id : number;
    track : Track;

    ngOnInit() {
      this.activatedRoute.params.subscribe( params => {
        this.id = params['id']
      });
  
      this.getContent(this.id);
    
    }

    getContent(id : number)
    {
      this.apiService.get('/track/' + id).subscribe((value : any) => {
        this.track = value;
      })
    }

}
