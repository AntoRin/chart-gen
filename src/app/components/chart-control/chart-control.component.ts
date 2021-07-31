import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ChartOptions } from "../../interfaces/ChartOptions";
import { AxisType, GraphType } from "../../types";

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
   public xAxisType: AxisType = "value";
   public yAxisType: AxisType = "category";
   public graphType: GraphType = "bar";

   public allowedGraphTypes: GraphType[] = ["bar", "line", "scatter"];

   constructor() {}

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
