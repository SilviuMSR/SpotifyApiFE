import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';

@Component({
  selector: 'app-artist-description',
  templateUrl: './artist-description.component.html',
  styleUrls: ['./artist-description.component.css']
})
export class ArtistDescriptionComponent implements OnInit {

  @Input()
  track: Track;
  constructor() { }

  ngOnInit() {
  }

}
