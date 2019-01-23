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
    neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDgyMzc1NDgsImV4cCI6MTU0ODMyMzk0OCwiaWF0IjoxNTQ4MjM3NTQ4fQ._kSOAN36ibMIaaSjto4CYggoRjtbm8roAwqciiMLJ2L9nXUbRIzpTja3kGjv6mPqbZ-a7emjpRtCD_nLnl0KJA";

    ngOnInit() {
      this.activatedRoute.params.subscribe( params => {
        this.id = params['id']
      });
  
      this.getContent(this.id);
    
    }

    getContent(id : number)
    {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.neededToken
      });
      this.apiService.get('/track/' + id, {headers : headers}).subscribe((value : any) => {
        this.track = value;
      })
    }

}
