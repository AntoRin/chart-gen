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
  public scroll: string | null = null;

  public constructor() {}

  public ngOnInit(): void {}

  handleChartCreation(options: ChartOptions) {
    this.chartOptions = options;
    this.scroll =
      Math.floor(Math.random() * 99999 + 1) +
      btoa(String(Math.floor(Math.random() * 99999 + 1)));
  }

  ngOnDestroy(): void {
    this.init = false;
    this.scroll = null;
  }
}
