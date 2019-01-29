import { Component, OnInit } from '@angular/core';
import { Track } from '../models/trackModel';
import { ApiService } from '../servicies/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-alltracks',
  templateUrl: './alltracks.component.html',
  styleUrls: ['./alltracks.component.css']
})
export class AlltracksComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  allTracks : Track[];

  ngOnInit() {

  }

  getAllTracks() {
    this.apiService.get('/track').subscribe((value : any) => {
      this.allTracks = value;
    })
  }

}
