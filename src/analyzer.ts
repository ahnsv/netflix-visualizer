import { ContentData, MovieData, SeriesData, Option } from './model'
import _ from 'underscore'

export class ViewData {
    public data: ContentData[];
    constructor(data: ContentData[]) {
        this.data = data
    }
    public getValue<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];  // Inferred type is T[K]
    }
    public getOnlyTitles<T extends ContentData>(obj: T[]) {
        return obj.map((d) => (this.isSeriesOrMovie(d)) ? d.seriesTitle : d.videoTitle)
    }
    public isSeriesOrMovie<T extends ContentData>(obj: T) {
        // if returns true, a series
        return (typeof obj.seriesTitle === 'string') ? true : false
    }
    public checkValidQuery<T, K extends keyof T>(res: T, key: K, query: string): boolean {
        return res[key] && key === query
    }
    public rankContentsBy<T extends ContentData>(res: T[], query: string, options?: Option) {
        return (query === 'series') ? _.countBy(res, 'seriesTitle') : _.countBy(res, 'videoTitle')
    }
    public bestSeriesBy<T extends ContentData>(res: T[], options?: Option) {
        const rankBySeriesCount = this.rankContentsBy(res.filter((d) => this.isSeriesOrMovie(d))
            , "series")
        let seriesArray = []
        for (let s in rankBySeriesCount) {
            seriesArray.push([s, rankBySeriesCount[s]])
        }
        const bestSeries = seriesArray.sort((a: any[], b: any[]) => {
            return b[1] - a[1];
        })
        if (options) {
            return _.first(bestSeries, options.num as number)
        }
        return bestSeries
    }
    public filterContentsBy<T>(res: T[], option: Option): T[] {
        return _.first(_.where(res, option.includes as SeriesData), option.num as number)
    }

    public sortContentsNameBy<T extends ContentData, K extends keyof T>(res: T[], query: K, option?: Option) {
        return _.sortBy(this.applyFilter(res, option as Option), query as string)
    }
    public searchContents<T extends ContentData, K extends keyof T>(res: T[], query: K, option?: Option) {
        return _.where(this.applyFilter(res, option as Option), query)
    }
    public applyFilter<T extends ContentData>(res: T[], option: Option) {
        if (option) {
            res = this.filterContentsBy(res, option)
        }
        return res
    }
    private _toDate(time: number) {
        return new Date(time)
    }
    private _isContentDataArray<T>(obj: any): obj is ContentData[] {
        return typeof obj[0].title === 'string'
    }
}
