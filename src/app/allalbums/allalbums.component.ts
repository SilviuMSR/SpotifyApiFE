import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import * as _ from 'underscore';
import { PagerService } from '../servicies/pager.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { SpotifyServiceService } from '../servicies/spotify-service.service';

@Component({
  selector: 'app-allalbums',
  templateUrl: './allalbums.component.html',
  styleUrls: ['./allalbums.component.css']
})
export class AllalbumsComponent implements OnInit {

  allAlbums : Album[];
  pager : any = {};
  pagedItems : any[];
  neededToken = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDgyMzc1NDgsImV4cCI6MTU0ODMyMzk0OCwiaWF0IjoxNTQ4MjM3NTQ4fQ._kSOAN36ibMIaaSjto4CYggoRjtbm8roAwqciiMLJ2L9nXUbRIzpTja3kGjv6mPqbZ-a7emjpRtCD_nLnl0KJA";

  constructor(private apiService : ApiService,
    private pagerService: PagerService,
    private route : Router,
    private srv : SpotifyServiceService) { }

  ngOnInit() {
    this.GetAllAlbums();
  }

  GetAllAlbums()
  {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.neededToken
    });
    this.apiService.get('/album', {headers: headers}).subscribe((value : any) => {
      this.allAlbums = value;
      this.setPage(1);
    })
  }

  setPage(page : number){
    if(page < 1 || page > this.pager.totalPages)
    {
      return;
    }
    this.pager = this.pagerService.getPager(this.allAlbums.length, page);

    this.pagedItems = this.allAlbums.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  getAlbumContent(album : Album)
  {
    this.route.navigate(['albumdescription/' + album.albumId])
  }

  insertAlbumToPlaylist(album : Album)
  {
    this.srv.insertAlbumToPlaylist(album.albumId);
  }

}
