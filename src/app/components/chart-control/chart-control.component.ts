import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ChartOptions } from "../../interfaces/ChartOptions";

@Component({
  selector: "app-chart-control",
  templateUrl: "./chart-control.component.html",
  styleUrls: ["./chart-control.component.css"],
})
export class ChartControlComponent implements OnInit {
  @Output() public chartInit: EventEmitter<ChartOptions> =
    new EventEmitter<ChartOptions>();

  public xAxisKeys: string[] = [];
  public values: string[] = [];
  public graphType: ChartOptions["type"] = "bar";

  public allowedGraphTypes: ChartOptions["type"][] = ["bar", "line"];

  constructor() {}

  ngOnInit(): void {}

  handleInputModification(newInput: string[]) {
    this.xAxisKeys = newInput;
  }

  handleValuesModification(newInput: string[]) {
    this.values = newInput;
  }

  removeKey(keyIdx: number) {
    this.xAxisKeys.splice(keyIdx, 1);
  }

  createChart(_: any): void {
    this.chartInit.emit({
      xAxisKeys: this.xAxisKeys,
      values: this.values.map((val) => Number(val)),
      type: this.graphType,
    });
  }
}
