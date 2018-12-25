"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
function getResource(rsc) {
    fs_1.default.readFile('./viewedHistory.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        }
        rsc = JSON.parse(data);
    });
}
function checkValidQuery(query) {
    Object.keys(contents);
}
function filterContentsBy(res, option) {
    // return res.filter((key, value) => {
    //     // TODO: how to do multi options
    //     let options = Object.entries(option.includes as SeriesData)
    //     for (let i in options) {
    //         if (options[i] !== [key, value]) return false
    //     }
    //     return true
    // })
    return res.reduce(function (arr, resItem, index) {
        // TODO: check if resItem has key/value of option
        if (resItem)
            ;
    }, []);
}
function sortContentsNameBy(res, query, option) {
    if (option) {
        filterContentsBy(res, option);
    }
    if ()
        return res.sort(function (a, b) { return (a[query] > b[query]) ? 1 : 0; }).map(function (value) { return value.videoTitle; });
}
function sortContentsBy(res, query, option) {
}
function searchContent() { }
function searchContents() { }
