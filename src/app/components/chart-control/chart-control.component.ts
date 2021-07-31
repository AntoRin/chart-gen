import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ChartOptions } from "../../interfaces/ChartOptions";
import { AxisType, GraphType } from "../../types";

@Component({
  selector: "app-chart-control",
  templateUrl: "./chart-control.component.html",
  styleUrls: ["./chart-control.component.css"],
})
export class ChartControlComponent implements OnInit {
  @Output() public chartInit: EventEmitter<ChartOptions> =
    new EventEmitter<ChartOptions>();

  public chartTitle: string = "";
  public xAxisKeys: string[] = [];
  public yAxisKeys: string[] = [];
  public xAxisType: AxisType = "value";
  public yAxisType: AxisType = "category";
  public graphType: GraphType = "bar";

  public allowedGraphTypes: GraphType[] = ["bar", "line", "scatter"];

  constructor() {}

  ngOnInit(): void {}

  handleInputModification(newInput: string) {
    this.xAxisKeys.push(newInput);
  }

  removeInput(idx: number) {
    this.xAxisKeys.splice(idx, 1);
  }

  handleValuesModification(newInput: string) {
    this.yAxisKeys.push(newInput);
  }

  removeValue(keyIdx: number) {
    this.yAxisKeys.splice(keyIdx, 1);
  }

  createChart(_: any): void {
    this.chartInit.emit({
      title: this.chartTitle,
      xAxisKeys: this.xAxisKeys,
      xAxisType: this.xAxisType,
      yAxisKeys: this.yAxisKeys.map((val) => Number(val)),
      yAxisType: this.yAxisType,
      type: this.graphType,
    });
  }
}
