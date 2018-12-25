"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var underscore_1 = __importDefault(require("underscore"));
var fs_1 = __importDefault(require("fs"));
var ViewData = /** @class */ (function () {
    function ViewData(data) {
        this.data = data;
    }
    ViewData.prototype.getValue = function (obj, key) {
        return obj[key]; // Inferred type is T[K]
    };
    ViewData.prototype.checkValidQuery = function (res, key, query) {
        return res[key] && key == query;
    };
    ViewData.prototype.filterContentsBy = function (res, option) {
        return underscore_1.default.where(res, option);
    };
    ViewData.prototype.sortContentsNameBy = function (res, query, option) {
        if (option) {
            res = this.filterContentsBy(res, option);
        }
        return underscore_1.default.sortBy(res, query).map(function (data) { return data[query]; });
    };
    ViewData.prototype.sortContentsBy = function (res, query, option) {
        if (option) {
            res = this.filterContentsBy(res, option);
        }
        return underscore_1.default.sortBy(res, query);
    };
    ViewData.prototype.searchContents = function (res, query, option) {
        if (option) {
            res = this.filterContentsBy(res, option);
        }
        return underscore_1.default.where(res, query);
    };
    return ViewData;
}());
exports.ViewData = ViewData;
var res = [];
res = JSON.parse(fs_1.default.readFileSync("viewedHistory.json", "utf8"));
var test = new ViewData(res);
test.getValue(test.data[0], "title");
test.sortContentsNameBy(test.data, "title");
