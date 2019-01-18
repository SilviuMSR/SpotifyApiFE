import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../models/trackModel';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  @Input()
  track:Track;
  constructor() { }

  ngOnInit() {
  }

}
