import bb from 'billboard.js'
import { ContentData, VisualizeOption } from './model';

export class ViewDataVisualizer {
    public generateGraph(category: string, options: VisualizeOption) {
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
        })
    }
}
