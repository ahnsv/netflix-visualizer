"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var analyzer_1 = require("../analyzer");
var fs_1 = __importDefault(require("fs"));
describe('analyzer', function () {
    var res = JSON.parse(fs_1.default.readFileSync("viewedHistory.json", "utf8"));
    var test = new analyzer_1.ViewData(res);
    it('Getting resources right', function () {
        chai_1.expect(test.data).to.have.property('title');
    });
    it('Get title value', function () {
        chai_1.expect(test.getValue(test.data[0], "title"));
    });
});
