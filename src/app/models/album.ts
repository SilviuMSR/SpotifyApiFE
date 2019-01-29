import { Artist } from './artistModel';

export class Album 
{
    albumId: number;
    playlistAlbumId : number;
    name: string;
    type: string;
    imgUri : string;
    artists: Artist[];
}