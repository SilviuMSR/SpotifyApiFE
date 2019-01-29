import { Artist } from './artistModel';
import { Album } from './album';

export class Track {
    playlistTrackId: number;
    trackId : number;
    albumId : number;
    artists?: Artist[];
    name: string;
    trackNumber: number;
    href?: string; 
    previewUrl: string;
}
