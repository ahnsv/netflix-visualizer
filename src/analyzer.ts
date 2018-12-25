import { ContentData, MovieData, SeriesData, Option } from './model'
import _ from 'underscore'

export class ViewData {
    data: ContentData[];
    constructor(data: ContentData[]) {
        this.data = data
    }
    getValue<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];  // Inferred type is T[K]
    }

    checkValidQuery<T, K extends keyof T>(res: T, key: K, query: string): boolean {
        return res[key] && key == query
    }

    filterContentsBy<T>(res: Array<T>, option: Option): Array<T> {
        return _.first(_.where(res, option.includes as SeriesData), option.num as number)
    }
    sortContentsNameBy<T, K extends keyof T>(res: Array<T>, query: K, option?: Option) {
        // TODO: ApplyFilter here
        this.applyFilter(res, option as Option)
        return _.sortBy(res, query as string)
    }
    searchContents<T, K extends keyof T>(res: Array<T>, query: K, option?: Option) {
        // TODO: ApplyFilter here
        return _.where(res, query)
    }

    applyFilter<T, K extends keyof T>(res: Array<T>, option: Option) {
        if (option) {
            res = this.filterContentsBy(res, option)
            if (option.onlyName) {
                // How to get property of Object with Generics
                return res.map(data => data["title"])
            }
        }
        return res
    }
}
