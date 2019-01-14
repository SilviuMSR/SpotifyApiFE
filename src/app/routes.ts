import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArtistPlaylistComponent } from './artist-playlist/artist-playlist.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';

export const ROUTES = [
    { path: '',  component: HomeComponent },
    { path: 'artistplaylist/:id', component: ArtistPlaylistComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', component: NotFoundComponent }
];
