import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import * as _ from 'underscore';
import { PagerService } from '../servicies/pager.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SpotifyServiceService } from '../servicies/spotify-service.service';
import { AlbumServiceService } from '../servicies/album-service.service';

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
    private albumService : AlbumServiceService,
    private router : Router,
    private srv : SpotifyServiceService,
    private http: HttpClient) { }

  ngOnInit() {
    this.GetAllAlbums();
  }

  GetAllAlbums()
  {
    /*this.apiService.get('/album').subscribe((value : any) => {
      this.allAlbums = value.values;
      this.AlbumLinks = value.links;
      for(var i = 1; i <= this.AlbumLinks.totalPages; i++)
      {
        this.pages[i] = i;
      }
      this.GetAlbums(1);
    })*/
    this.albumService.getTopAlbums().subscribe((value : any) => {
      this.allAlbums = value.values;
      this.AlbumLinks = value.links;
      for(var i = 1; i <= this.AlbumLinks.totalPages; i++)
      {
        this.pages[i] = i;
      }
      this.GetAlbums(1);
    })
    
  }

  GetAlbums(pageNumber : number) {   
    /*let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJTaWx2aXUxMiIsIm5iZiI6MTU0ODgzNjIyNiwiZXhwIjoxNTQ4OTIyNjI2LCJpYXQiOjE1NDg4MzYyMjZ9._FKpBU6YwuQ_N0e3uQ500GLimD6MY4pXu2T17FA-Mn0VtW3gqVA0zFQl2WYY_iynh1KCVRWzeu8b43M9z87hHw'
    });
    this.http.get('https://localhost:5001/api/album?pageNumber=' + pageNumber + '&pageSize=5', {headers: headers}).subscribe((value : any) => {
      this.allAlbums = value.values;
      console.log(this.allAlbums);
      this.AlbumLinks = value.links;
    })*/
    this.albumService.getAlbumByPage(pageNumber).subscribe((value : any) => {
      this.allAlbums = value.values;
      this.AlbumLinks = value.links;
    })
  }

  getAlbumContent(album : Album)
  {
    this.router.navigate(['albumdescription/' + album.albumId])
  }

  insertAlbumToPlaylist(album : Album)
  {
    this.srv.insertAlbumToPlaylist(album.albumId);
  }

  goToAlbums()
  {
    this.router.navigate(['allalbums']);
  }
  
  goToTracks()
  {
    this.router.navigate(['alltracks']);
  }

  goToArtists()
  {
    this.router.navigate(['allartists']);
  }

}
