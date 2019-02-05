import { Component, OnInit } from '@angular/core';
import { UserService } from '../servicies/user.service';
import { Router } from '@angular/router';
import { AlbumServiceService } from '../servicies/album-service.service';
import { Album } from '../models/album';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router,
    private albumService: AlbumServiceService) { }

  username: string;
  isAdmin: boolean = false;

  allRequests: any;
  allRequestsLinks: any;

  albumname: string;
  albumtype: string;
  albumuri: string;
  album: Album;

  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  getAllRequests() {
    this.userService.getRequests().subscribe((value: any) => {
      this.allRequests = value.values;
      this.allRequestsLinks = value.links;
    })
  }

  goToAlbums()
  {
    this.router.navigate(['allalbums']);
  }
  
  goToTracks()
  {
    this.router.navigate(['alltracks']);
  }

  goToArtists()
  {
    this.router.navigate(['allartists']);
  }

  insertAlbum() {

    this.album = {
      name: this.albumname,
      type: this.albumtype,
      imgUri: this.albumuri
    };

    this.albumService.insertAlbum(this.album).subscribe((value: any) => {
      if(value != null) {
        alert("Inserted");
        location.reload();
      }
      else {
        alert("Album not inserted");
      }
    })
  }

}
