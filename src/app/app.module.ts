import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

// import the routes
import { ROUTES } from './routes';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { ArtistsComponent } from './artists/artists.component';
import { ArtistdescriptionComponent } from './artistdescription/artistdescription.component';
import { TracksComponent } from './tracks/tracks.component';
import { TrackDescriptionComponent } from './track-description/track-description.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AllalbumsComponent } from './allalbums/allalbums.component';
import { AlltracksComponent } from './alltracks/alltracks.component';
import { AllartistsComponent } from './allartists/allartists.component';
import * as _ from 'underscore';
import { ProfileComponent } from './profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { HasRoleDirective } from './directive/has-role.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegComponent,
    AlbumsComponent,
    AlbumDescriptionComponent,
    ArtistsComponent,
    ArtistdescriptionComponent,
    TracksComponent,
    TrackDescriptionComponent,
    AfterLoginComponent,
    AllalbumsComponent,
    AlltracksComponent,
    AllartistsComponent,
    ProfileComponent,
    HasRoleDirective,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),

  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
