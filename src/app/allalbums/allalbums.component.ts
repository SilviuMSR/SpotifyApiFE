import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicies/api.service';
import { Album } from '../models/album';
import * as _ from 'underscore';
import { PagerService } from '../servicies/pager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allalbums',
  templateUrl: './allalbums.component.html',
  styleUrls: ['./allalbums.component.css']
})
export class AllalbumsComponent implements OnInit {

  allAlbums : Album[];
  pager : any = {};
  pagedItems : any[];

  constructor(private apiService : ApiService,
    private pagerService: PagerService,
    private route : Router) { }

  ngOnInit() {
    this.GetAllAlbums();
  }

  GetAllAlbums()
  {
    this.apiService.get('/album').subscribe((value : any) => {
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
    this.route.navigate(['albumdescription/' + album.id])
  }

}
