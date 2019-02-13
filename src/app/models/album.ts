import { Artist } from './artistModel';
import { Track } from './trackModel';

export class Album 
{
    albumId?: number;
    playlistAlbumId? : number;
    name: string;
    type: string;
    imgUri : string;
    tracks?: Track[];
    artists?: Artist[];
}