import { GraphType } from "../types";

export interface ChartOptions {
   xAxisKeys: string[];
   yAxisKeys: string[];
   type: GraphType;
   seriesName: string;
}
