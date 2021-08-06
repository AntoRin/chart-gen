import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Chart } from "../../../interfaces/Chart";
import { ChartOptions } from "../../../interfaces/ChartOptions";
import { GlobalOptions } from "../../../interfaces/GlobalOptions";
import { DatasetsType, GraphType, SettingsTabType } from "../../../types";

@Component({
   selector: "app-chart-control",
   templateUrl: "./chart-control.component.html",
   styleUrls: ["./chart-control.component.css"],
})
export class ChartControlComponent implements OnInit, OnDestroy {
   @Output() public chartInit: EventEmitter<Chart> = new EventEmitter<Chart>();

   private _primaryIdx: number = 0;
   public datasets: DatasetsType[] = [];
   public currentTabIndex: number = 0;
   public globalOptions: GlobalOptions;

   public selectedTab: SettingsTabType = "basic";
   public allowedGraphTypes: GraphType[] = ["bar", "line", "scatter"];

   constructor(private _snackBar: MatSnackBar) {
      this.globalOptions = {
         chartTitle: "",
         backgroundColor: undefined,
         enableZoom: false,
         xCategories: [],
         yCategories: [],
         xName: "",
         yName: "",
         xAxisType: "category",
         yAxisType: "value",
      };
   }

   ngOnInit(): void {
      this.createNewDatasetTab();
   }

   private _getDefaultChartOptions(): ChartOptions {
      return {
         type: "bar",
         xAxisKeys: [],
         yAxisKeys: [],
         seriesName: "",
      };
   }

   private _openSnackbar(message: string) {
      this._snackBar.open(message, "close", {
         panelClass: "snackbar-control",
         duration: 5000,
      });
      return;
   }

   createNewDatasetTab() {
      const id = this._primaryIdx++;
      this.datasets.push({
         datasetName: "Chart-Tab-" + id,
         chartOptions: this._getDefaultChartOptions(),
      });

      this.currentTabIndex = this.datasets.length - 1;
   }

   changeDatasetTab(idx: number) {
      this.currentTabIndex = idx;
   }

   deleteDatasetTab(idx: number) {
      this.datasets.splice(idx, 1);

      if (idx === this.currentTabIndex) {
         this.currentTabIndex = !!this.datasets[idx - 1] ? idx - 1 : !!this.datasets[idx + 1] ? idx + 1 : 0;
      } else if (idx < this.currentTabIndex) {
         this.currentTabIndex = this.currentTabIndex - 1;
      } else {
      }
   }

   changeTab(tabName: SettingsTabType) {
      this.selectedTab = tabName;
   }

   setZoom(event: MatSlideToggleChange) {
      this.globalOptions.enableZoom = event.checked;
   }

   handleInputModification(newInput: string, axis: "x" | "y") {
      if (axis === "x") {
         if (this.globalOptions.xAxisType === "value" && isNaN(Number(newInput))) {
            this._openSnackbar("Axis initialized as value but is not provided a number");
            return;
         }
         this.datasets[this.currentTabIndex].chartOptions.xAxisKeys.push(newInput);
      } else if (axis === "y") {
         if (this.globalOptions.yAxisType === "value" && isNaN(Number(newInput))) {
            this._openSnackbar("Axis initialized as value but is not provided a number");
            return;
         }
         this.datasets[this.currentTabIndex].chartOptions.yAxisKeys.push(newInput);
      }
   }

   removeInput(idx: number, axis: "x" | "y") {
      axis === "x"
         ? this.datasets[this.currentTabIndex].chartOptions.xAxisKeys.splice(idx, 1)
         : this.datasets[this.currentTabIndex].chartOptions.yAxisKeys.splice(idx, 1);
   }

   modifyValue(options: { index: number; value: string }, axis: "x" | "y") {
      if (!options.value) return;

      if (axis === "x") this.datasets[this.currentTabIndex].chartOptions.xAxisKeys[options.index] = options.value;
      else this.datasets[this.currentTabIndex].chartOptions.yAxisKeys[options.index] = options.value;
   }

   swapValues() {
      const temp: string[] = [...this.datasets[this.currentTabIndex].chartOptions.xAxisKeys];
      this.datasets[this.currentTabIndex].chartOptions.xAxisKeys = [...this.datasets[this.currentTabIndex].chartOptions.yAxisKeys];
      this.datasets[this.currentTabIndex].chartOptions.yAxisKeys = [...temp];
   }

   createChart(_: any): void {
      if (this.globalOptions.xAxisType === "category" && this.globalOptions.yAxisType === "category") {
         this._openSnackbar("Both the axes cannot be categories - one must be a value");
         return;
      }

      if (
         !this.datasets[this.currentTabIndex].chartOptions.xAxisKeys.length ||
         !this.datasets[this.currentTabIndex].chartOptions.yAxisKeys.length
      ) {
         this._openSnackbar("Axis values cannot be empty");
         if (this.selectedTab !== "initialize") this.selectedTab = "initialize";
         return;
      }

      this.chartInit.emit({
         datasets: this.datasets,
         globalOptions: this.globalOptions,
      });
   }

   ngOnDestroy(): void {}
}
