import { Artist } from './artistModel';
import { Album } from './album';

export class Track {
    album: Album;
    artists: Artist[];
    name: string;
    track_number: number;
    href: string; 
    preview_url: string;
}
