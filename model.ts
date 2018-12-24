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

export interface SeriesData {
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
    series?: number;
    seriesTitle?: string;
    seasonDescriptor?: string;
    episodeTitle?: string;
    estRating?: string;
}

export interface Option {
    num?: number;
    includes?: SeriesData
}
