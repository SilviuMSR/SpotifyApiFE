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

export const ROUTES = [
    { path: '',  component: HomeComponent },
    { path: 'artistdescription/:id', component: ArtistdescriptionComponent},
    { path: 'login', component: LoginComponent},
    { path: 'reg', component: RegComponent},
    { path: 'albumdescription/:id', component: AlbumDescriptionComponent},
    { path: 'trackdescription/:id', component : TrackDescriptionComponent},
    { path: 'after', component: AfterLoginComponent},
    { path: '**', component: NotFoundComponent }
];
