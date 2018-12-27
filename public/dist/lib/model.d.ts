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
declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
export declare type SeriesData = Partial<ContentData>;
export interface Option {
    num?: number;
    includes?: SeriesData;
    onlyName?: boolean;
}
export interface VisualizeOption {
    columns?: any[];
    type?: string;
    event?: (data: any, index: any) => void;
    animation?: any[];
    bindTo?: string;
}
export {};
//# sourceMappingURL=model.d.ts.map