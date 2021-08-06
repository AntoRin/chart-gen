import { AxisType } from "../types";

export interface GlobalOptions {
   enableZoom: boolean;
   backgroundColor: string | undefined;
   xCategories: string[];
   yCategories: string[];
   xName: string;
   yName: string;
   chartTitle: string;
   xAxisType: AxisType;
   yAxisType: AxisType;
}
