import { GraphType } from "../types";

export interface ChartOptions {
   xAxisKeys: string[];
   type: GraphType;
   yAxisKeys: string[];
   seriesName: string;
}
