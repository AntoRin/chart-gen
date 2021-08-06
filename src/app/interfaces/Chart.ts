import { DatasetsType } from "../types";
import { GlobalOptions } from "./GlobalOptions";

export interface Chart {
   globalOptions: GlobalOptions;
   datasets: DatasetsType[];
}
