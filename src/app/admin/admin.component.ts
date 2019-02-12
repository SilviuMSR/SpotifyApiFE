import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AlbumServiceService } from '../servicies/album-service.service';
import { UserService } from '../servicies/user.service';
import { User } from '../models/userModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private albumService: AlbumServiceService,
    private userService: UserService,
    private toastr: ToastrService) { }

  requests: boolean = false;
  add: boolean = false;
  users: boolean = false;
  albums: boolean = false;
  useragent: boolean = false;

  albumname: string;
  albumtype: string;
  albumuri: string;
  album: Album;

  adminname: string;
  adminemail: string;
  adminpassword: string;
  admin: User;

  allRequests: any;
  allRequestsLinks: any;
  request: any;

  allUsers: any;
  allUsersLinks: any;

  ngOnInit() {
  }

  insertAlbum() {

    this.album = {
      name: this.albumname,
      type: this.albumtype,
      imgUri: this.albumuri
    };

    this.albumService.insertAlbum(this.album).subscribe((value: any) => {
      if(value != null) {
        console.log(value);
        this.toastr.success("Album created successfully");
      }
      else {
        this.toastr.error("We can't create this album!");
      }
    })
  }

  getAllRequests() {
    this.userService.getRequests().subscribe((value: any) => {
      this.allRequests = value.values;
      console.log(value);
      this.allRequestsLinks = value.metadata;
    })
  }

  
  displayNextRequests() {
    this.userService.displayNextRequests(this.allRequestsLinks.nextPageLink).subscribe((value : any) => {
      this.allRequests = value.values;
      this.allRequestsLinks = value.metadata;
    })
  }

  displayPreviousRequests() {
    this.userService.displayPreviousRequests(this.allRequestsLinks.previousPageLink).subscribe((value : any) => {
      this.allRequests = value.values;
      this.allRequestsLinks = value.metadata;
    })
  }

  createAdmin() {

    this.admin = {
      username: this.adminname,
      password: this.adminpassword,
      email: this.adminemail
    }

    this.userService.registerAdmin(this.admin).subscribe((value: any) => {
      if(value != null)
        this.toastr.success("Successfully created!");
    })
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((value: any) => {
      this.allUsers = value.values;
      this.allUsersLinks = value.links;
    })
  }

  displayNextUsers() {
    this.userService.displayNextUsers(this.allUsersLinks.nextPageLink).subscribe((value : any) => {
      this.allUsers = value.values;
      this.allUsersLinks = value.links;
    })
  }

  displayPreviousUsers() {
    this.userService.displayPreviousUsers(this.allUsersLinks.previousPageLink).subscribe((value : any) => {
      this.allUsers = value.values;
      this.allUsersLinks = value.links;
    })
  }

  getUserAgentData(request: any) {
    console.log(request.userAgent);
    this.request = {
      description: request.userAgent.simpleSoftware,
      software: request.userAgent.software,
      system: request.userAgent.operatingSystem
    }
  }

}
