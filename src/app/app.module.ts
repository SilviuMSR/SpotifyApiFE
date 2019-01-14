import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

// import the routes
import { ROUTES } from './routes';
import { ArtistDescriptionComponent } from './artist-description/artist-description.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ArtistPlaylistComponent } from './artist-playlist/artist-playlist.component';
import { SongDescriptionComponent } from './song-description/song-description.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    ArtistDescriptionComponent,
    ArtistPlaylistComponent,
    SongDescriptionComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
