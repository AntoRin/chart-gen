import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ChartOptions } from "../../../interfaces/ChartOptions";
import { AxisType, GraphType, SettingsTabType } from "../../../types";

@Component({
   selector: "app-chart-control",
   templateUrl: "./chart-control.component.html",
   styleUrls: ["./chart-control.component.css"],
})
export class ChartControlComponent implements OnInit {
   @Output() public chartInit: EventEmitter<ChartOptions> = new EventEmitter<ChartOptions>();

   public selectedTab: SettingsTabType = "basic";
   public chartTitle: string = "";
   public xAxisKeys: string[] = [];
   public yAxisKeys: string[] = [];
   public xAxisType: AxisType = "category";
   public yAxisType: AxisType = "value";
   public graphType: GraphType = "bar";
   public enableZoom: boolean = false;
   public backgroundColor: string | undefined;

   public allowedGraphTypes: GraphType[] = ["bar", "line", "scatter"];

   constructor(private _snackBar: MatSnackBar) {}

   ngOnInit(): void {}

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
      this.enableZoom = event.checked;
   }

   handleInputModification(newInput: string, axis: "x" | "y") {
      if (axis === "x") {
         if (this.xAxisType === "value" && isNaN(Number(newInput))) {
            this._openSnackbar("Axis initialized as value but is not provided a number");
            return;
         }
         this.xAxisKeys.push(newInput);
      } else if (axis === "y") {
         if (this.yAxisType === "value" && isNaN(Number(newInput))) {
            this._openSnackbar("Axis initialized as value but is not provided a number");
            return;
         }
         this.yAxisKeys.push(newInput);
      }
   }

   removeInput(idx: number, axis: "x" | "y") {
      axis === "x" ? this.xAxisKeys.splice(idx, 1) : this.yAxisKeys.splice(idx, 1);
   }

   modifyValue(options: { index: number; value: string }, axis: "x" | "y") {
      if (!options.value) return;

      if (axis === "x") this.xAxisKeys[options.index] = options.value;
      else this.yAxisKeys[options.index] = options.value;
   }

   swapValues() {
      const temp: string[] = this.xAxisKeys;
      this.xAxisKeys = this.yAxisKeys;
      this.yAxisKeys = temp;
   }

   createChart(_: any): void {
      if (this.xAxisType === "category" && this.yAxisType === "category") {
         this._openSnackbar("Both the axes cannot be categories - one must be a value");
         return;
      }

      if (!this.xAxisKeys.length || !this.yAxisKeys.length) {
         this._openSnackbar("Axis values cannot be empty");
         return;
      }

      this.chartInit.emit({
         title: this.chartTitle,
         xAxisKeys: this.xAxisKeys,
         xAxisType: this.xAxisType,
         yAxisKeys: this.yAxisKeys,
         yAxisType: this.yAxisType,
         type: this.graphType,
         enableZoom: this.enableZoom,
         backgroundColor: this.backgroundColor,
      });
   }
}
