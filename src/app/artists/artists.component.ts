import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../models/artistModel';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {

  @Input()
  artist : Artist;
  constructor() { }

  ngOnInit() {
  }

}
