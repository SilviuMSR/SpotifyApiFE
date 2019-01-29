import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import * as _ from 'underscore';
import { PagerService } from '../servicies/pager.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpotifyServiceService } from '../servicies/spotify-service.service';

@Component({
  selector: 'app-allalbums',
  templateUrl: './allalbums.component.html',
  styleUrls: ['./allalbums.component.css']
})
export class AllalbumsComponent implements OnInit {

  allAlbums : Album[];
  AlbumLinks : any;
  pages : number[] = [];

  constructor(private apiService : ApiService,
    private route : Router,
    private srv : SpotifyServiceService,
    private http: HttpClient) { }

  ngOnInit() {
    this.GetAllAlbums();
  }

  GetAllAlbums()
  {
    this.apiService.get('/album').subscribe((value : any) => {
      this.allAlbums = value.values;
      this.AlbumLinks = value.links;
      for(var i = 1; i <= this.AlbumLinks.totalPages; i++)
      {
        this.pages[i] = i;
      }
    })
  }

  GetAlbums(pageNumber : number) {   
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJTaWx2aXUiLCJuYmYiOjE1NDg3NDYzMDcsImV4cCI6MTU0ODgzMjcwNywiaWF0IjoxNTQ4NzQ2MzA3fQ.XKMKN1zZdKKY4g1uLapVZCKV-tx4J3lEC-YQcYMWo2eMe5t50Q590TdVhL6MLi5bhQFnBLEtPWLHT_N3zz7N_g'
    });
    this.http.get('https://localhost:5001/api/album?pageNumber=' + pageNumber + '&pageSize=9', {headers: headers}).subscribe((value : any) => {
      this.allAlbums = value.values;
      console.log(this.allAlbums);
      this.AlbumLinks = value.links;
    })
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
