import { Component, OnDestroy, OnInit } from "@angular/core";
import { ChartOptions } from "../../interfaces/ChartOptions";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit, OnDestroy {
  public chartOptions: ChartOptions = {} as ChartOptions;
  public init: boolean = true;

  public constructor() {}

  public ngOnInit(): void {}

  handleChartCreation(options: ChartOptions) {
    this.chartOptions = options;
  }

  ngOnDestroy(): void {
    this.init = false;
  }
}
