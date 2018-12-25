export interface ContentData {
    title: string;
    videoTitle: string;
    movieID: number;
    country: string;
    bookmark: number;
    duration: number;
    date: number;
    deviceType: number;
    dateStr: string;
    index: number;
    topNodeId: string;
    series?: number;
    seriesTitle?: string;
    seasonDescriptor?: string;
    episodeTitle?: string;
    estRating: string;
}

export interface MovieData {
    title?: string;
    videoTitle?: string;
    movieID?: number;
    country?: string;
    bookmark?: number;
    duration?: number;
    date?: number;
    deviceType?: number;
    dateStr?: string;
    index?: number;
    topNodeId?: string;
    estRating?: string;
}
type Partial<T> = {
    [P in keyof T]?: T[P]
}

export type SeriesData = Partial<ContentData>

export type Option = {
    num?: number;
    includes?: SeriesData
}