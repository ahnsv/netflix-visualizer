import { ContentData, MovieData, SeriesData, Option } from './model'
import _ from 'underscore'

export class ViewData {
    data: ContentData[];
    constructor(data: ContentData[]) {
        this.data = data
    }
    private _toDate(time: number) {
        return new Date(time)
    }
    private _isContentDataArray<T>(obj: any): obj is ContentData[] {
        return typeof obj[0]["title"] === 'string'
    }
    getValue<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];  // Inferred type is T[K]
    }
    getOnlyTitles<T extends ContentData>(obj: Array<T>) {
        return obj.map(d => (this.isSeriesOrMovie(d)) ? d.seriesTitle : d.videoTitle)
    }
    isSeriesOrMovie<T extends ContentData>(obj: T) {
        // if returns true, a series
        return (typeof obj["seriesTitle"] === 'string') ? true : false
    }
    checkValidQuery<T, K extends keyof T>(res: T, key: K, query: string): boolean {
        return res[key] && key == query
    }
    rankContentsBy<T extends ContentData>(res: Array<T>, query: string, options?: Option) {
        return (query === 'series') ? _.countBy(res, 'seriesTitle') : _.countBy(res, 'videoTitle')
    }
    bestSeriesBy<T extends ContentData>(res: Array<T>, options?: Option) {
        const rankBySeriesCount = this.rankContentsBy(res.filter(d => this.isSeriesOrMovie(d))
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
    filterContentsBy<T>(res: Array<T>, option: Option): Array<T> {
        return _.first(_.where(res, option.includes as SeriesData), option.num as number)
    }

    sortContentsNameBy<T extends ContentData, K extends keyof T>(res: Array<T>, query: K, option?: Option) {
        return _.sortBy(this.applyFilter(res, option as Option), query as string)
    }
    searchContents<T extends ContentData, K extends keyof T>(res: Array<T>, query: K, option?: Option) {
        return _.where(this.applyFilter(res, option as Option), query)
    }
    applyFilter<T extends ContentData>(res: Array<T>, option: Option) {
        if (option) {
            res = this.filterContentsBy(res, option)
        }
        return res
    }
}
