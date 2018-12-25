import { ContentData, MovieData, SeriesData, Option } from './model'
import _ from 'underscore'

export class ViewData {
    private fs = require('fs');
    path: string;
    data: ContentData[];
    constructor(path: string) {
        this.path = path
        this.data = []
    }
    // TODO: (Bug) does not go thru this because of async function
    getResource(path: string) {
        this.fs.readFile(path, (err: any, data: string) => {
            if (err) {
                return console.error(err);
            }
            this.data = JSON.parse(data)
        });
    }
    getValue<T, K extends keyof T>(obj: T, key: K) {
        return obj[key];  // Inferred type is T[K]
    }

    checkValidQuery<T, K extends keyof T>(res: T, key: K, query: string): boolean {
        return res[key] && key == query
    }

    filterContentsBy<T>(res: Array<T>, option: Option): Array<T> {
        return _.where(res, option)
    }
    sortContentsNameBy<T, K extends keyof T>(res: Array<T>, query: K, option?: Option) {
        if (option) {
            res = this.filterContentsBy(res, option)
        }
        return _.sortBy(res, query as string).map(data => data[query])
    }

    sortContentsBy<T, K extends keyof T>(res: Array<T>, query: K, option?: Option) {
        if (option) {
            res = this.filterContentsBy(res, option)
        }
        return _.sortBy(res, query as string)
    }

    searchContents<T, K extends keyof T>(res: Array<T>, query: K, option?: Option) {
        if (option) {
            res = this.filterContentsBy(res, option)
        }
        return _.where(res, query)
    }

}

let test = new ViewData('../viewedHistory.json')
test.getResource(test.path)
test.getValue(test.data[0], "title")
test.sortContentsNameBy(test.data, "title")