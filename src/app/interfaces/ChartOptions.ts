import { AxisType, GraphType } from "../types";

export interface ChartOptions {
  title?: string;
  xAxisKeys: string[] | number[];
  xAxisType: AxisType;
  type: GraphType;
  yAxisKeys: string[] | number[];
  yAxisType: AxisType;
}
