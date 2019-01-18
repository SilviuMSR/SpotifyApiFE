import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

// import the routes
import { ROUTES } from './routes';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ArtistPlaylistComponent } from './artist-playlist/artist-playlist.component';
import { SongDescriptionComponent } from './song-description/song-description.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import {MatCardModule} from '@angular/material/card';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistdescriptionComponent } from './artistdescription/artistdescription.component';
import { TracksComponent } from './tracks/tracks.component';
import { TrackDescriptionComponent } from './track-description/track-description.component';
import { AfterLoginComponent } from './after-login/after-login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ArtistPlaylistComponent,
    SongDescriptionComponent,
    LoginComponent,
    RegComponent,
    AlbumsComponent,
    AlbumDescriptionComponent,
    ArtistsComponent,
    ArtistdescriptionComponent,
    TracksComponent,
    TrackDescriptionComponent,
    AfterLoginComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule


  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
