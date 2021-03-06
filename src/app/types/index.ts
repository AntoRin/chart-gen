import { ChartOptions } from "../interfaces/ChartOptions";

export type AxisType = "category" | "value";
export type GraphType = "bar" | "line" | "scatter" | "pie";
export type SettingsTabType = "basic" | "initialize";
export type DatasetsType = { datasetName: string; chartOptions: ChartOptions };
