"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var underscore_1 = __importDefault(require("underscore"));
var ViewData = /** @class */ (function () {
    function ViewData(data) {
        this.data = data;
    }
    ViewData.prototype._toDate = function (time) {
        return new Date(time);
    };
    ViewData.prototype._isContentDataArray = function (obj) {
        return typeof obj[0]["title"] === 'string';
    };
    ViewData.prototype.getValue = function (obj, key) {
        return obj[key]; // Inferred type is T[K]
    };
    ViewData.prototype.getOnlyTitles = function (obj) {
        var _this = this;
        return obj.map(function (d) { return (_this.isSeriesOrMovie(d)) ? d.seriesTitle : d.videoTitle; });
    };
    ViewData.prototype.isSeriesOrMovie = function (obj) {
        // if returns true, a series
        return (typeof obj["seriesTitle"] === 'string') ? true : false;
    };
    ViewData.prototype.checkValidQuery = function (res, key, query) {
        return res[key] && key == query;
    };
    ViewData.prototype.rankContentsBy = function (res, query, options) {
        return (query === 'series') ? underscore_1.default.countBy(res, 'seriesTitle') : underscore_1.default.countBy(res, 'videoTitle');
    };
    ViewData.prototype.bestSeriesBy = function (res, options) {
        var _this = this;
        var rankBySeriesCount = this.rankContentsBy(res.filter(function (d) { return _this.isSeriesOrMovie(d); }), "series");
        var seriesArray = [];
        for (var s in rankBySeriesCount) {
            seriesArray.push([s, rankBySeriesCount[s]]);
        }
        var bestSeries = seriesArray.sort(function (a, b) {
            return b[1] - a[1];
        });
        if (options) {
            return underscore_1.default.first(bestSeries, options.num);
        }
        return bestSeries;
    };
    ViewData.prototype.filterContentsBy = function (res, option) {
        return underscore_1.default.first(underscore_1.default.where(res, option.includes), option.num);
    };
    ViewData.prototype.sortContentsNameBy = function (res, query, option) {
        return underscore_1.default.sortBy(this.applyFilter(res, option), query);
    };
    ViewData.prototype.searchContents = function (res, query, option) {
        return underscore_1.default.where(this.applyFilter(res, option), query);
    };
    ViewData.prototype.applyFilter = function (res, option) {
        if (option) {
            res = this.filterContentsBy(res, option);
        }
        return res;
    };
    return ViewData;
}());
exports.ViewData = ViewData;
