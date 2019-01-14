import { User } from '../models/userModel';
import { Observable } from 'rxjs';
import { Track } from '../models/trackModel';
import { Artist } from '../models/artistModel';
import { Genres } from '../models/genresModel';
import { SeedAndTracks } from '../models/seedAndTracks';
import { Song } from '../models/Song';

export interface IDataService {
    getUserDetails(): Observable<User>;
    getTracks(ids: string): Observable<Track[]>;
    getArtistTopTracks(id: string): Observable<Song>;
    getArtists(searchString: string): Observable<Artist[]>;
    getRecomandations(genres: Genres): Observable<SeedAndTracks>;
    getGenres(): Observable<Genres>;


}
