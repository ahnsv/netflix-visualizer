import { ViewData } from "./analyzer";
import fs from 'fs'
import { ContentData } from './model';
import { ViewDataVisualizer } from "./visualizer";

let data: ContentData[] = JSON.parse(fs.readFileSync(__dirname + "/../viewedHistory.json").toString())
let viewData = new ViewData(data)
// TEST 1: sort by estRating top 5
const result = viewData.sortContentsNameBy(data, "estRating", { num: 5, onlyName: false })
console.log(viewData.getOnlyTitles(result))
// TEST 2: count num of series among data
const numOfSeries = data.filter(d => viewData.isSeriesOrMovie(d)).length
console.log(numOfSeries + " out of " + data.length)
// TEST 3: rank user's fav series
const bestSeries = viewData.bestSeriesBy(data, { num: 5 })
console.log('bestSeries: %o', bestSeries)
// TEST 4: visualize best Series by count
const [dataX, dataY] = [bestSeries.map(s => s[0]), bestSeries.map(s => s[1])]
const vis = new ViewDataVisualizer()
vis.generateGraph('bar', {
    bindTo: '#app',
    columns: [['series-name', ...dataX], ['episode-count', ...dataY]]
})
