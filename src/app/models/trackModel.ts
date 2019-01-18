import { Artist } from './artistModel';
import { Album } from './album';

export class Track {
    id : number;
    albumId : number;
    artists: Artist[];
    name: string;
    trackNumber: number;
    href: string; 
    previewUrl: string;
}
