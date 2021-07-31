import { AxisType, GraphType } from "../types";

export interface ChartOptions {
   title?: string;
   xAxisKeys: string[];
   xAxisType: AxisType;
   type: GraphType;
   yAxisKeys: string[];
   yAxisType: AxisType;
}
