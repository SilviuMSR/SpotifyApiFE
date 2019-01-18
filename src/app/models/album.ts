import { Artist } from './artistModel';

export class Album 
{
    id: number;
    name: string;
    type: string;
    imgUri : string;
    artists: Artist[];
}