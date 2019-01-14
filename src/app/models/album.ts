import { Artist } from './artistModel';

export class Album 
{
    id: string;
    name: string;
    type: string;
    artists: Artist[];
    images:{
        height: number,
        width: number,
        url: string,
    }
}