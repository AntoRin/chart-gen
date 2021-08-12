import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription } from "rxjs";
import { Chart } from "../../../../interfaces/Chart";
import { GlobalOptions } from "../../../../interfaces/GlobalOptions";
import { ActionDialogComponent } from "../../../../shared/components/action-dialog/action-dialog.component";
import { DatasetsType, GraphType, SettingsTabType } from "../../../../types";
import { ChartService } from "../../services/chart.service";

@Component({
   selector: "app-chart-control",
   templateUrl: "./chart-control.component.html",
   styleUrls: ["./chart-control.component.css"],
})
export class ChartControlComponent implements OnInit, OnDestroy {
   @ViewChild(ActionDialogComponent) private _actionDialog!: ActionDialogComponent;
   @Output() public chartInit: EventEmitter<Chart> = new EventEmitter<Chart>();

   private _primaryIdx: number = 0;
   public globalOptions: GlobalOptions;
   public datasets: DatasetsType[] = [];
   public currentTabIndex: number = 0;

   public selectedSettingsTab: SettingsTabType = "basic";
   public allowedGraphTypes: GraphType[] = ["bar", "line", "scatter", "pie"];

   public tabAnimation: boolean = false;

   constructor(private _snackBar: MatSnackBar, private chartService: ChartService) {
      this.globalOptions = { ...this.chartService.getDefaultGlobalOptions() };
   }

   ngOnInit(): void {
      const availableChart: Chart | undefined = this.chartService.getCurrentChart();

      if (availableChart) {
         this.globalOptions = { ...availableChart.globalOptions };
         this.datasets = [...availableChart.datasets];
         this._primaryIdx = +this.datasets[this.datasets.length - 1].datasetName.split("Dataset-")[1] + 1;
         this.createChart();
      } else {
         this.createNewDatasetTab();
      }
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
         datasetName: "Dataset-" + id,
         chartOptions: { ...this.chartService.getDefaultChartOptions() },
      });
      this.changeDatasetTab(this.datasets.length - 1, false);
   }

   changeDatasetTab(idx: number, changeSettingsTab: boolean = true) {
      this.tabAnimation = true;
      this.currentTabIndex = idx;
      if (this.selectedSettingsTab === "basic" && changeSettingsTab) this.selectedSettingsTab = "initialize";
   }

   confirmDatasetTabDelete(idx: number) {
      const action$: Observable<string> = this._actionDialog.open(
         "Delete Tab?",
         "Are you sure you want to delete this tab without saving?",
         "",
         ["Confirm", "Cancel"]
      );

      let subRef: Subscription | undefined;

      subRef = action$.subscribe((action: string) => {
         if (action.toLocaleLowerCase() === "confirm") {
            this.deleteDatasetTab(idx);
         }

         if (subRef) subRef.unsubscribe();
      });
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

   changeSettingsTab(tabName: SettingsTabType) {
      this.selectedSettingsTab = tabName;
   }

   setZoom(event: MatSlideToggleChange) {
      this.globalOptions.enableZoom = event.checked;
   }

   handleNewValue(newInput: string, axis: "x" | "y") {
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

   swapValues() {
      const temp: string[] = [...this.datasets[this.currentTabIndex].chartOptions.xAxisKeys];
      this.datasets[this.currentTabIndex].chartOptions.xAxisKeys = [...this.datasets[this.currentTabIndex].chartOptions.yAxisKeys];
      this.datasets[this.currentTabIndex].chartOptions.yAxisKeys = [...temp];
   }

   resetChart(): void {
      this.globalOptions = { ...this.chartService.getDefaultGlobalOptions() };
      this.datasets = [];
   }

   private _addRequiredCategoryNames(): void {
      if (this.globalOptions.xAxisType === "category" && this.globalOptions.yAxisType === "value") {
         let largestDatasetLength: number = 0;

         this.datasets.forEach(
            dataset =>
               (largestDatasetLength =
                  dataset.chartOptions.yAxisKeys.length > largestDatasetLength
                     ? dataset.chartOptions.yAxisKeys.length
                     : largestDatasetLength)
         );

         if (this.globalOptions.xCategories.length > largestDatasetLength) {
            this.globalOptions.xCategories.length = largestDatasetLength;
         } else {
            for (let i = this.globalOptions.xCategories.length; i < largestDatasetLength; i++) {
               this.globalOptions.xCategories[i] = `Category${i}`;
            }
         }
      } else if (this.globalOptions.yAxisType === "category" && this.globalOptions.xAxisType === "value") {
         let largestDatasetLength: number = 0;

         this.datasets.forEach(
            dataset =>
               (largestDatasetLength =
                  dataset.chartOptions.xAxisKeys.length > largestDatasetLength
                     ? dataset.chartOptions.xAxisKeys.length
                     : largestDatasetLength)
         );

         if (this.globalOptions.yCategories.length > largestDatasetLength) {
            this.globalOptions.yCategories.length = largestDatasetLength;
         } else {
            for (let i = this.globalOptions.yCategories.length; i < largestDatasetLength; i++) {
               this.globalOptions.yCategories[i] = `Category${i}`;
            }
         }
      }
   }

   createChart(): void {
      if (this.globalOptions.xAxisType === "category" && this.globalOptions.yAxisType === "category") {
         this._openSnackbar("Both the axes cannot be categories - one must be a value");
         this.selectedSettingsTab = "basic";
         return;
      }

      for (let i = 0; i < this.datasets.length; i++) {
         const dataset: DatasetsType = this.datasets[i];

         if (
            (this.globalOptions.xAxisType === "value" && !dataset.chartOptions.xAxisKeys.length) ||
            (this.globalOptions.yAxisType === "value" && !dataset.chartOptions.yAxisKeys.length)
         ) {
            this._openSnackbar("Axis values cannot be empty");
            if (this.selectedSettingsTab !== "initialize") this.selectedSettingsTab = "initialize";
            this.currentTabIndex = i;
            return;
         }
      }

      this._addRequiredCategoryNames();

      this.chartInit.emit({
         datasets: this.datasets,
         globalOptions: this.globalOptions,
      });
   }

   ngOnDestroy(): void {}
}
