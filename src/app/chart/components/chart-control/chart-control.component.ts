import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ChartOptions } from "../../../interfaces/ChartOptions";
import { AxisType, GraphType } from "../../../types";

@Component({
   selector: "app-chart-control",
   templateUrl: "./chart-control.component.html",
   styleUrls: ["./chart-control.component.css"],
})
export class ChartControlComponent implements OnInit {
   @Output() public chartInit: EventEmitter<ChartOptions> = new EventEmitter<ChartOptions>();

   public chartTitle: string = "";
   public xAxisKeys: string[] = [];
   public yAxisKeys: string[] = [];
   public xAxisType: AxisType = "category";
   public yAxisType: AxisType = "value";
   public graphType: GraphType = "bar";

   public allowedGraphTypes: GraphType[] = ["bar", "line", "scatter"];

   constructor(private _snackBar: MatSnackBar) {}

   ngOnInit(): void {}

   handleInputModification(newInput: string, axis: "x" | "y") {
      axis === "x" ? this.xAxisKeys.push(newInput) : this.yAxisKeys.push(newInput);
   }

   removeInput(idx: number, axis: "x" | "y") {
      axis === "x" ? this.xAxisKeys.splice(idx, 1) : this.yAxisKeys.splice(idx, 1);
   }

   modifyValue(options: { index: number; value: string }, axis: "x" | "y") {
      if (axis === "x") this.xAxisKeys[options.index] = options.value;
      else this.yAxisKeys[options.index] = options.value;
   }

   createChart(_: any): void {
      if (this.xAxisType === "category" && this.yAxisType === "category") {
         this._snackBar.open("Both the axes cannot be categories - one must be a value", "close", {
            panelClass: "snackbar-control",
            duration: 5000,
         });
         return;
      }

      if (!this.xAxisKeys.length || !this.yAxisKeys.length) {
         this._snackBar.open("Axis values cannot be empty", "close", {
            panelClass: "snackbar-control",
            duration: 5000,
         });
         return;
      }

      this.chartInit.emit({
         title: this.chartTitle,
         xAxisKeys: this.xAxisKeys,
         xAxisType: this.xAxisType,
         yAxisKeys: this.yAxisKeys,
         yAxisType: this.yAxisType,
         type: this.graphType,
      });
   }
}
