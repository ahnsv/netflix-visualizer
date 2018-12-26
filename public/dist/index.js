"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var analyzer_1 = require("./analyzer");
var fs_1 = __importDefault(require("fs"));
var visualizer_1 = require("./visualizer");
var data = JSON.parse(fs_1.default.readFileSync(__dirname + "/../viewedHistory.json").toString());
var viewData = new analyzer_1.ViewData(data);
// TEST 1: sort by estRating top 5
var result = viewData.sortContentsNameBy(data, "estRating", { num: 5, onlyName: false });
console.log(viewData.getOnlyTitles(result));
// TEST 2: count num of series among data
var numOfSeries = data.filter(function (d) { return viewData.isSeriesOrMovie(d); }).length;
console.log(numOfSeries + " out of " + data.length);
// TEST 3: rank user's fav series
var bestSeries = viewData.bestSeriesBy(data, { num: 5 });
console.log('bestSeries: %o', bestSeries);
// TEST 4: visualize best Series by count
var _a = [bestSeries.map(function (s) { return s[0]; }), bestSeries.map(function (s) { return s[1]; })], dataX = _a[0], dataY = _a[1];
var vis = new visualizer_1.ViewDataVisualizer();
vis.generateGraph('bar', {
    bindTo: '#app',
    columns: [['series-name'].concat(dataX), ['episode-count'].concat(dataY)]
});
