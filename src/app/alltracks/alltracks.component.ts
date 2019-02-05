import { Component, OnInit } from '@angular/core';
import { Track } from '../models/trackModel';
import { ApiService } from '../servicies/api.service';
import { HttpHeaders } from '@angular/common/http';
import { TrackServiceService } from '../servicies/track-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alltracks',
  templateUrl: './alltracks.component.html',
  styleUrls: ['./alltracks.component.css']
})
export class AlltracksComponent implements OnInit {

  constructor(private apiService: ApiService,
    private trackService: TrackServiceService,
    private route : Router) { }

  allTracks : Track[];
  trackLinks : any;
  pages : number[] = [];
  trackName: any;

  ngOnInit() {
    this.getAllTracks();
  }

  getAllTracks() {
    /*this.apiService.get('/track').subscribe((value : any) => {
      this.allTracks = value;
    })*/
    this.trackService.getTopTracks().subscribe((value : any) => {
      this.allTracks = value.values;
      this.trackLinks = value.links;
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
        alert("Track not found");
      }
      this.getTrackContent(value.values[0]);
    })
  }

}
