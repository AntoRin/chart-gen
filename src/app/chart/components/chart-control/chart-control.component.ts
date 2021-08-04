import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, Subscription } from "rxjs";
import { ChartOptions } from "../../../interfaces/ChartOptions";
import { DatasetsType, GraphType, SettingsTabType } from "../../../types";

@Component({
   selector: "app-chart-control",
   templateUrl: "./chart-control.component.html",
   styleUrls: ["./chart-control.component.css"],
})
export class ChartControlComponent implements OnInit, OnChanges, OnDestroy {
   @Input() public dataset!: DatasetsType;
   @Input() public requestSnapsotSubject: Subject<any> | undefined;
   @Output() public chartInit: EventEmitter<DatasetsType> = new EventEmitter<DatasetsType>();
   @Output() public datasetSnapshot: EventEmitter<DatasetsType> = new EventEmitter<DatasetsType>();

   private _requestSubscriptionRef: Subscription | undefined;

   public currentTab: number = 0;
   public tabName: string = "";
   public selectedTab: SettingsTabType = "basic";

   public chartOptions: ChartOptions = {} as ChartOptions;
   public allowedGraphTypes: GraphType[] = ["bar", "line", "scatter"];

   constructor(private _snackBar: MatSnackBar) {}

   ngOnInit(): void {
      if (this.requestSnapsotSubject)
         this._requestSubscriptionRef = this.requestSnapsotSubject.subscribe(() => {
            this._emitSnapshot();
         });
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (!this.dataset) return;
      this.chartOptions = this.dataset.chartOptions;
      this.currentTab = this.dataset.index;
      this.tabName = this.dataset.datasetName;
   }

   private _getCurrentDataset(): DatasetsType {
      const currentDataset: DatasetsType = {
         index: this.currentTab,
         datasetName: this.tabName,
         chartOptions: this.chartOptions,
      };

      return currentDataset;
   }

   public _emitSnapshot(): void {
      this.datasetSnapshot.emit(this._getCurrentDataset());
   }

   private _openSnackbar(message: string) {
      this._snackBar.open(message, "close", {
         panelClass: "snackbar-control",
         duration: 5000,
      });
      return;
   }

   changeTab(tabName: SettingsTabType) {
      this.selectedTab = tabName;
   }

   setZoom(event: MatSlideToggleChange) {
      this.chartOptions.enableZoom = event.checked;
   }

   handleInputModification(newInput: string, axis: "x" | "y") {
      if (axis === "x") {
         if (this.chartOptions.xAxisType === "value" && isNaN(Number(newInput))) {
            this._openSnackbar("Axis initialized as value but is not provided a number");
            return;
         }
         this.chartOptions.xAxisKeys.push(newInput);
      } else if (axis === "y") {
         if (this.chartOptions.yAxisType === "value" && isNaN(Number(newInput))) {
            this._openSnackbar("Axis initialized as value but is not provided a number");
            return;
         }
         this.chartOptions.yAxisKeys.push(newInput);
      }
   }

   removeInput(idx: number, axis: "x" | "y") {
      axis === "x" ? this.chartOptions.xAxisKeys.splice(idx, 1) : this.chartOptions.yAxisKeys.splice(idx, 1);
   }

   modifyValue(options: { index: number; value: string }, axis: "x" | "y") {
      if (!options.value) return;

      if (axis === "x") this.chartOptions.xAxisKeys[options.index] = options.value;
      else this.chartOptions.yAxisKeys[options.index] = options.value;
   }

   swapValues() {
      const temp: string[] = [...this.chartOptions.xAxisKeys];
      this.chartOptions.xAxisKeys = [...this.chartOptions.yAxisKeys];
      this.chartOptions.yAxisKeys = [...temp];
   }

   createChart(_: any): void {
      if (this.chartOptions.xAxisType === "category" && this.chartOptions.yAxisType === "category") {
         this._openSnackbar("Both the axes cannot be categories - one must be a value");
         return;
      }

      if (!this.chartOptions.xAxisKeys.length || !this.chartOptions.yAxisKeys.length) {
         this._openSnackbar("Axis values cannot be empty");
         if (this.selectedTab !== "initialize") this.selectedTab = "initialize";
         return;
      }

      this.chartInit.emit(this._getCurrentDataset());
   }

   ngOnDestroy(): void {
      this._requestSubscriptionRef?.unsubscribe();
   }
}
