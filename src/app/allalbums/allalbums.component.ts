import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { AlbumServiceService } from '../servicies/album-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allalbums',
  templateUrl: './allalbums.component.html',
  styleUrls: ['./allalbums.component.css']
})
export class AllalbumsComponent implements OnInit {

  allAlbums : Album[];
  AlbumLinks : any;
  pages : number[] = [];
  albumName: string;

  selectedRow : Number;
  setClickedRow : Function;

  currentPage: number;

  constructor(
    private albumService : AlbumServiceService,
    private router : Router,
    private toastrService: ToastrService) {
      this.setClickedRow = function(index){
        if(this.selectedRow == null)
          this.selectedRow = index;
        else this.selectedRow = null;
      }
     }

  ngOnInit() {
    this.GetAllAlbums();
  }

  GetAllAlbums()
  {
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
    this.albumService.getAlbumByPage(pageNumber).subscribe((value : any) => {
      this.allAlbums = value.values;
      this.AlbumLinks = value.links;
      this.currentPage = pageNumber;
    })
  }

  getAlbumContent(album : Album)
  {
    this.router.navigate(['albumdescription/' + album.albumId])
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

  getAlbumByName() {
    this.albumService.getByName(this.albumName).subscribe((value: any) => {
      if(value.values.length == 0) {
        this.toastrService.error("This album is not existing!");
      }
      this.getAlbumContent(value.values[0]);
    })
  }

}
