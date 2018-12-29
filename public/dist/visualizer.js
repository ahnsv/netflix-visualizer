import bb from 'billboard.js';
var ViewDataVisualizer = /** @class */ (function () {
    function ViewDataVisualizer() {
    }
    ViewDataVisualizer.prototype.generateGraph = function (category, options) {
        bb.generate({
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
export { ViewDataVisualizer };
