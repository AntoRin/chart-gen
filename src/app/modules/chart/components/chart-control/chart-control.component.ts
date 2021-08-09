import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription } from "rxjs";
import { Chart } from "../../../../interfaces/Chart";
import { ChartOptions } from "../../../../interfaces/ChartOptions";
import { GlobalOptions } from "../../../../interfaces/GlobalOptions";
import { ActionDialogComponent } from "../../../../shared/components/action-dialog/action-dialog.component";
import { DatasetsType, GraphType, SettingsTabType } from "../../../../types";

@Component({
   selector: "app-chart-control",
   templateUrl: "./chart-control.component.html",
   styleUrls: ["./chart-control.component.css"],
})
export class ChartControlComponent implements OnInit, OnDestroy {
   @ViewChild(ActionDialogComponent) private _actionDialog!: ActionDialogComponent;
   @Output() public chartInit: EventEmitter<Chart> = new EventEmitter<Chart>();

   private _primaryIdx: number = 0;
   public datasets: DatasetsType[] = [];
   public currentTabIndex: number = 0;
   public globalOptions: GlobalOptions;

   public selectedSettingsTab: SettingsTabType = "basic";
   public allowedGraphTypes: GraphType[] = ["bar", "line", "scatter"];

   public tabAnimation: boolean = false;

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
         datasetName: "Dataset-" + id,
         chartOptions: this._getDefaultChartOptions(),
      });
      this.tabAnimation = true;
      this.currentTabIndex = this.datasets.length - 1;
   }

   changeDatasetTab(idx: number) {
      this.tabAnimation = true;
      this.currentTabIndex = idx;
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

   swapValues() {
      const temp: string[] = [...this.datasets[this.currentTabIndex].chartOptions.xAxisKeys];
      this.datasets[this.currentTabIndex].chartOptions.xAxisKeys = [...this.datasets[this.currentTabIndex].chartOptions.yAxisKeys];
      this.datasets[this.currentTabIndex].chartOptions.yAxisKeys = [...temp];
   }

   createChart(_: any): void {
      if (this.globalOptions.xAxisType === "category" && this.globalOptions.yAxisType === "category") {
         this._openSnackbar("Both the axes cannot be categories - one must be a value");
         this.selectedSettingsTab = "basic";
         return;
      }

      if (
         (this.globalOptions.xAxisType === "category" || this.globalOptions.yAxisType === "category") &&
         !this.globalOptions.xCategories.length &&
         !this.globalOptions.yCategories.length
      ) {
         console.log(this.globalOptions.xCategories);
         this._openSnackbar("Axis initialized as category must have category names");
         this.selectedSettingsTab = "basic";
         return;
      }

      if (
         !this.datasets[this.currentTabIndex].chartOptions.xAxisKeys.length &&
         !this.datasets[this.currentTabIndex].chartOptions.yAxisKeys.length
      ) {
         this._openSnackbar("Axis values cannot be empty");
         if (this.selectedSettingsTab !== "initialize") this.selectedSettingsTab = "initialize";
         return;
      }

      this.chartInit.emit({
         datasets: this.datasets,
         globalOptions: this.globalOptions,
      });
   }

   ngOnDestroy(): void {}
}
