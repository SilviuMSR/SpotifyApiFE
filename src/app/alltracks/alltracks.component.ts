import { Component, OnInit } from '@angular/core';
import { Track } from '../models/trackModel';
import { ApiService } from '../servicies/api.service';
import { HttpHeaders } from '@angular/common/http';
import { TrackServiceService } from '../servicies/track-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alltracks',
  templateUrl: './alltracks.component.html',
  styleUrls: ['./alltracks.component.css']
})
export class AlltracksComponent implements OnInit {

  constructor(
    private trackService: TrackServiceService,
    private route : Router,
    private toastr: ToastrService) { }

  allTracks : Track[];
  trackLinks : any;
  pages : number[] = [];
  trackName: any;

  currentPage: Number;

  ngOnInit() {
    this.getAllTracks();
  }

  getAllTracks() {
    this.trackService.getTopTracks().subscribe((value : any) => {
      this.allTracks = value.values;
      this.trackLinks = value.links;
      console.log(value.links)
      for(var i = 1; i <= this.trackLinks.totalPages; i++)
      {
        this.pages[i] = i;
      }
      this.GetTracks(1);
    })
  }

  
  GetTracks(pageNumber : number) {   
    this.trackService.getTrackByPage(pageNumber).subscribe((value : any) => {
      this.allTracks = value.values;
      this.trackLinks = value.links;
      this.currentPage = pageNumber;
    })
  }

  getTrackContent(track : Track)
  {
    this.route.navigate(['trackdescription/' + track.trackId])
  }

  goToAlbums()
  {
    this.route.navigate(['allalbums']);
  }
  
  goToTracks()
  {
    this.route.navigate(['alltracks']);
  }

  goToArtists()
  {
    this.route.navigate(['allartists']);
  }

  getTrackByName() {
    this.trackService.getTrackByName(this.trackName).subscribe((value: any) => {
      if(value.values.length == 0) {
        this.toastr.error("This track is not existing!");
      }
      this.getTrackContent(value.values[0]);
    })
  }

}
