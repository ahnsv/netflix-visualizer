import fs from 'fs'
import { MovieData, SeriesData } from './model'

type contents = MovieData | SeriesData
let resource: Array<contents> = []
fs.readFile('./viewedHistory.json', 'utf8', (err, data) => {
    if (err) { console.log(err) }
    resource = JSON.parse(data)
})
