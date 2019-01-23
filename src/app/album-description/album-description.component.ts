import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpHeaders } from '@angular/common/http';

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
  neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDgyMzc1NDgsImV4cCI6MTU0ODMyMzk0OCwiaWF0IjoxNTQ4MjM3NTQ4fQ._kSOAN36ibMIaaSjto4CYggoRjtbm8roAwqciiMLJ2L9nXUbRIzpTja3kGjv6mPqbZ-a7emjpRtCD_nLnl0KJA";

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id']
    });

    this.getContent(this.id);
  
  }

  getContent(id : string)
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
    this.apiService.get('/album/' + id, {headers:headers}).subscribe((value : any) => {
      this.album = value;
      this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`);
      /*this.apiService.get('/track/byAlbum/' + id).subscribe((t : any) => {
        this.tracks = t;
        this.backgroundStyle = this.sanitization.bypassSecurityTrustStyle(`linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${this.album.imgUri})`)
        console.log(this.backgroundStyle)
      })*/
    })
  }

}
