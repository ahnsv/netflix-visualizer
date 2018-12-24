"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
fs_1.default.readFile('./viewedHistory.json', 'utf8', function (err, data) {
    // string split
    var parsed = JSON.parse(data);
    console.log(parsed[0]);
});
