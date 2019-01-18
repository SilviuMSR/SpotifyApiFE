import { Component, OnInit, Input } from '@angular/core';
import { Track } from '../models/trackModel';

@Component({
  selector: 'app-song-description',
  templateUrl: './song-description.component.html',
  styleUrls: ['./song-description.component.css']
})
export class SongDescriptionComponent implements OnInit {

  @Input()
  song: Track;
  constructor() { }

  ngOnInit() {
  }

  playSong() {
    //location.href = this.song.preview_url;
  }

}
