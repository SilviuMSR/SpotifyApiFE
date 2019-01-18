import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../models/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  @Input()
  album : Album;
  constructor() { }

  ngOnInit() {
  }

}
