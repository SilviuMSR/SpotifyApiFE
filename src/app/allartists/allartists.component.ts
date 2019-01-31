import { Component, OnInit } from '@angular/core';
import { ArtistServiceService } from '../servicies/artist-service.service';
import { Artist } from '../models/artistModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allartists',
  templateUrl: './allartists.component.html',
  styleUrls: ['./allartists.component.css']
})
export class AllartistsComponent implements OnInit {

  constructor(private artistService : ArtistServiceService,
    private route : Router) { }

  allArtists : Artist[] = [];
  artistLinks : any;
  pages : number[] = [];

  ngOnInit() {
    this.getAllArtists();
  }

  getAllArtists() {
    this.artistService.getTopArtists().subscribe((value : any) => {
      this.allArtists = value.values;
      this.artistLinks = value.links;
      for(var i = 1; i <= this.artistLinks.totalPages; i++)
      {
        this.pages[i] = i;
      }
      this.GetArtists(1);
    })
  }

  GetArtists(pageNumber : number) {   
    this.artistService.getArtistByPage(pageNumber).subscribe((value : any) => {
      this.allArtists = value.values;
      this.artistLinks = value.links;
    })
  }

  getArtistContent(artist : Artist)
  {
    this.route.navigate(['artistdescription/' + artist.artistId])
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

}
