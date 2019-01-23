import { Artist } from './artistModel';

export class Album 
{
    albumId: number;
    name: string;
    type: string;
    imgUri : string;
    artists: Artist[];
}