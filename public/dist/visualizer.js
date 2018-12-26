"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var billboard_js_1 = __importDefault(require("billboard.js"));
var ViewDataVisualizer = /** @class */ (function () {
    function ViewDataVisualizer() {
    }
    ViewDataVisualizer.prototype.generateGraph = function (category, options) {
        billboard_js_1.default.generate({
            bindto: options.bindTo,
            data: {
                colors: {
                    data1: "green"
                },
                columns: options.columns,
                types: {
                    data1: "area-spline"
                },
            }
        });
    };
    return ViewDataVisualizer;
}());
exports.ViewDataVisualizer = ViewDataVisualizer;
