import bb from 'billboard.js'
import { ContentData, VisualizeOption } from './model';

export class ViewDataVisualizer {
    constructor() { }
    generateGraph(category: string, options: VisualizeOption) {
        bb.generate({
            bindto: options.bindTo,
            data: {
                columns: options.columns,
                types: {
                    data1: "area-spline"
                },
                colors: {
                    data1: "green"
                }
            }
        })
    }
}