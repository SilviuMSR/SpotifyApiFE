import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../models/album';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';
import { Router } from '@angular/router';
import { AlbumServiceService } from '../servicies/album-service.service';
import { TrackServiceService } from '../servicies/track-service.service';
import { ArtistServiceService } from '../servicies/artist-service.service';
import { PlaylistAlbumService } from '../servicies/playlist-album.service';
import { PlaylistTrackService } from '../servicies/playlist-track.service';
import { PlaylistartistService } from '../servicies/playlistartist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.css']
})
export class AfterLoginComponent implements OnInit {

  topArtists : Artist[] = [];
  topAlbums : Album[] = [];
  topTracks : Track[] = [];

  albumOption : boolean;
  artistOption : boolean;
  trackOption : boolean;

  savedAlbums : Album[] = [];
  savedTracks : Track[] = [];
  savedArtists : Artist[] = [];

  playlistAlbums : Album[] = [];
  playlistTracks : Track[] = [];
  playlistArtists : Artist[] = [];

  defaultStartPage = 1;
  defaultPageSize = 5;

  playlistAlbumLinks : any;
  playlistTrackLinks : any;
  playlistArtistLinks : any;

  audio : any;
  isPlayed : boolean = false;
  loggedUser : any;

  constructor(
    private router: Router,
    private albumService: AlbumServiceService,
    private trackService: TrackServiceService,
    private artistService: ArtistServiceService,
    private playlistAlbumService: PlaylistAlbumService,
    private playlistTrackService: PlaylistTrackService,
    private playlistArtistService: PlaylistartistService,
    private toastr: ToastrService
    ) {
      
    }

    ngOnInit() {
     

      this.playlistAlbums = [];
      this.playlistTracks = [];
      this.playlistArtists = [];
      console.log(this.playlistAlbums)
     this.getTopArtists();
     this.getTopAlbums();
     this.getTopTracks();

     this.audio = new Audio();
     this.loggedUser = localStorage.getItem('username');
     
    }


    getTopArtists(){
      this.artistService.getTopArtists().subscribe((value : any) => {
        this.topArtists = value.values;
      })
    }
  
    getTopAlbums(){
      this.albumService.getTopAlbums().subscribe((value : any) => {
        this.topAlbums = value.values;
      })
    }
  
    getTopTracks(){
      this.trackService.getTopTracks().subscribe((value : any) => {
        this.topTracks = value.values;
      })
    }
    
    generateAlbumContent(album : Album)
    {
      if(album.playlistAlbumId != null)
      {
        this.albumService.getByName(album.name).subscribe((value: any) => {
          this.router.navigate(['albumdescription/' + value.values[0].albumId]);
        })
      }
      else
      {
        this.router.navigate(['albumdescription/' + album.albumId]);
      }
    }
  
    generateArtistContent(artist : Artist)
    {
      if(artist.playlistArtistId != null) {
        this.artistService.getByName(artist.name).subscribe((value: any) => {
          this.router.navigate(['artistdescription/' + value.values[0].artistId]);
        })
      }
      else {
        this.router.navigate(['artistdescription/' + artist.artistId]);
      }
    }
  
    generateTrackContent(track : Track)
    {
      if(track.playlistTrackId != null) {
        this.trackService.getTrackByName(track.name).subscribe((value: any) => {
          this.router.navigate(['trackdescription/' + value.values[0].trackId]);
        })
      }
      else {
        this.router.navigate(['trackdescription/' + track.trackId]);
      }
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

    setAlbumOption() {
      this.albumOption = true;
      this.trackOption = false;
      this.artistOption = false;
    }

    setTrackOption() {
      this.trackOption = true;
      this.albumOption = false;
      this.artistOption = false;
    }

    setArtistOption()
    {
      this.artistOption = true;
      this.albumOption = false;
      this.trackOption = false;
    }

    displayPlaylistArtists() {
      this.playlistArtistService.displayPlaylistArtist().subscribe((value : any) => {
        this.playlistArtists = value.values;
        this.playlistArtistLinks = value.links;
        console.log(this.playlistArtists);
      })
    }

    displayNextArtists() {
      this.playlistArtistService.displayNextArtists(this.playlistArtistLinks.nextPageLink).subscribe((value : any) => {
        this.playlistArtists = value.values;
        this.playlistArtistLinks = value.links;
      })
    }

    displayPreviousArtists() {
      this.playlistArtistService.displayPreviousArtists(this.playlistArtistLinks.previousPageLink).subscribe((value : any) => {
        this.playlistArtists = value.values;
        this.playlistArtistLinks = value.links;
      })
    }

    deleteArtistFromPlaylist(artist : Artist){
      this.playlistArtistService.deleteArtistFromPlaylist(artist).subscribe(() => {
        this.toastr.success("Successfully deleted!");
        location.reload();
      })
    }

    displayPlaylistAlbums() {
      this.playlistAlbumService.displayPlaylistAlbum().subscribe((value : any) => {
        this.playlistAlbums = value.values;
        console.log(this.playlistAlbums);
        this.playlistAlbumLinks = value.links;
      })
    }

    displayNextAlbums() {   
      this.playlistAlbumService.displayNextAlbums(this.playlistAlbumLinks.nextPageLink).subscribe((value : any) => {
        this.playlistAlbums = value.values;
        this.playlistAlbumLinks = value.links;
      })
    }

    displayPlaylistTracks(){
        this.playlistTrackService.displayPlaylistTrack().subscribe((value : any) => {
          this.playlistTracks = value.values;
          this.playlistTrackLinks = value.links;
        })

    }

    displayPreviousAlbums() {
      this.playlistAlbumService.displayPreviousAlbums(this.playlistAlbumLinks.previousPageLink).subscribe((value : any) => {
        this.playlistAlbums = value.values;
        this.playlistAlbumLinks = value.links;
      })
    }

    displayNextTracks() {   
      this.playlistTrackService.displayNextTracks(this.playlistTrackLinks.nextPageLink).subscribe((value : any) => {
        this.playlistTracks = value.values;
        this.playlistTrackLinks = value.links;
      })
    }

    displayPreviousTracks() {
      this.playlistTrackService.displayPreviousTracks(this.playlistTrackLinks.previousPageLink).subscribe((value : any) => {
        this.playlistTracks = value.values;
        this.playlistTrackLinks = value.links;
      })
    }


    deleteAlbumFromPlaylist(album : Album){
      this.playlistAlbumService.deleteAlbumFromPlaylist(album).subscribe((value: any) => {
        location.reload();
        this.toastr.success("Successfully deleted!");
      })
    }

    deleteTrackFromPlaylist(track : Track) {
      this.playlistTrackService.deleteTrackFromPlaylist(track).subscribe( () => {
        location.reload();
        this.toastr.success("Successfully deleted!");

      });
    }

    playTrack(track: Track)
    {
      this.audio.src = track.previewUrl;
      this.audio.load();
      this.audio.play();
      this.isPlayed = true;
    }
  
    stopTrack() {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlayed = false;
    }

}
