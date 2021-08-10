import { Injectable } from "@angular/core";
import { Chart } from "../../../interfaces/Chart";
import { ChartOptions } from "../../../interfaces/ChartOptions";
import { GlobalOptions } from "../../../interfaces/GlobalOptions";

@Injectable({
   providedIn: "root",
})
export class ChartService {
   public currentChart: Chart | undefined;

   constructor() {}

   getCurrentChart(): Chart | undefined {
      return this.currentChart;
   }

   setCurrentChart(chart: Chart): void {
      this.currentChart = chart;
   }

   getDefaultGlobalOptions(): GlobalOptions {
      return {
         chartTitle: "MyChart",
         backgroundColor: "transparent",
         enableZoom: false,
         xCategories: ["Category 1", "Category 2"],
         yCategories: ["Category 1", "Category 2"],
         xName: "X-Axis",
         yName: "Y-Axis",
         xAxisType: "category",
         yAxisType: "value",
      };
   }

   getDefaultChartOptions(): ChartOptions {
      return {
         type: "bar",
         xAxisKeys: [],
         yAxisKeys: [],
         seriesName: "",
      };
   }

   saveChartToLocalStorage(chart: Chart): void {
      window.localStorage.setItem(chart.globalOptions.chartTitle, JSON.stringify(chart));
   }

   getAllChartsFromLocalStorage(): Chart[] {
      let charts: Chart[] = [];

      for (const chartName of Object.getOwnPropertyNames(window.localStorage)) {
         try {
            const retrievedItem: any = window.localStorage.getItem(chartName);
            if (!retrievedItem) continue;

            let item: any = JSON.parse(retrievedItem);

            if ("datasets" in item && "globalOptions" in item) charts.push(item);
         } catch (error) {
            continue;
         }
      }

      return charts;
   }
}
