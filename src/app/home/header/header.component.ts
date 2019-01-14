import { Component, OnInit } from '@angular/core';
import { SpotifyServiceService } from 'src/app/servicies/spotify-service.service';
import { User } from 'src/app/models/userModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
