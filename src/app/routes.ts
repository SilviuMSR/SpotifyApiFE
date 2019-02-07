import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArtistPlaylistComponent } from './artist-playlist/artist-playlist.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { ArtistdescriptionComponent } from './artistdescription/artistdescription.component';
import { TrackDescriptionComponent } from './track-description/track-description.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { AllalbumsComponent } from './allalbums/allalbums.component';
import { AllartistsComponent } from './allartists/allartists.component';
import { AlltracksComponent } from './alltracks/alltracks.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';

export const ROUTES = [
    { path: '',  component: HomeComponent },
    { path: 'artistdescription/:id', component: ArtistdescriptionComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'User']}},
    { path: 'login', component: LoginComponent},
    { path: 'reg', component: RegComponent},
    { path: 'albumdescription/:id', component: AlbumDescriptionComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'User']}},
    { path: 'trackdescription/:id', component : TrackDescriptionComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'User']}},
    { path: 'after', component: AfterLoginComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'User']}},
    { path: 'allalbums', component: AllalbumsComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'User']}},
    { path: 'allartists', component: AllartistsComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'User']}},
    { path: 'alltracks', component: AlltracksComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'User']}},
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {roles: ['Admin', 'User']}},
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: ['Admin']}},
    { path: '**', component: NotFoundComponent }
];
