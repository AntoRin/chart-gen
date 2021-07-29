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

  public xAxis: string = "";
  public values: string = "";
  public graphType: ChartOptions["type"] = "bar";

  public allowedGraphTypes: ChartOptions["type"][] = ["bar", "line"];

  constructor() {}

  ngOnInit(): void {}

  createChart(_: any): void {
    let xAxisKeys: string[] = this.xAxis.split(" ");
    let values: number[] | string[] = this.values.split(" ");

    try {
      values = values.map((key: string) => Number(key));
    } catch (error) {
      console.log(error);
      return;
    }

    this.chartInit.emit({
      xAxisKeys,
      values,
      type: this.graphType,
    });
  }
}
