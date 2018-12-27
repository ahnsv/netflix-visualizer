import { ContentData, Option } from './model';
import _ from 'underscore';
export declare class ViewData {
    data: ContentData[];
    constructor(data: ContentData[]);
    getValue<T, K extends keyof T>(obj: T, key: K): T[K];
    getOnlyTitles<T extends ContentData>(obj: T[]): (string | undefined)[];
    isSeriesOrMovie<T extends ContentData>(obj: T): boolean;
    checkValidQuery<T, K extends keyof T>(res: T, key: K, query: string): boolean;
    rankContentsBy<T extends ContentData>(res: T[], query: string, options?: Option): _.Dictionary<number>;
    bestSeriesBy<T extends ContentData>(res: T[], options?: Option): (string | number)[][];
    filterContentsBy<T>(res: T[], option: Option): T[];
    sortContentsNameBy<T extends ContentData, K extends keyof T>(res: T[], query: K, option?: Option): T[];
    searchContents<T extends ContentData, K extends keyof T>(res: T[], query: K, option?: Option): T[];
    applyFilter<T extends ContentData>(res: T[], option: Option): T[];
    private _toDate;
    private _isContentDataArray;
}
//# sourceMappingURL=analyzer.d.ts.map