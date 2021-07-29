import { Directive, ElementRef, Input, OnChanges, OnInit } from "@angular/core";
import * as echart from "echarts";
import { ChartOptions } from "../interfaces/ChartOptions";

@Directive({
  selector: "[appChartContainer]",
})
export class ChartContainerDirective implements OnInit, OnChanges {
  @Input() chartOptions: ChartOptions = {} as ChartOptions;
  @Input() init!: boolean;
  public containerElement!: HTMLDivElement;
  public chartInstance: echart.ECharts | undefined;

  constructor(private _elementRef: ElementRef) {}

  ngOnInit(): void {
    const element: HTMLDivElement = this._elementRef.nativeElement;
    this.containerElement = element;
  }

  ngOnChanges() {
    if (!this.init || !Object.getOwnPropertyNames(this.chartOptions).length)
      return;

    if (!this.chartInstance)
      this.chartInstance = echart.init(this.containerElement);
    else this.chartInstance.clear();

    this.chartInstance.setOption({
      title: {
        text: "Testing echarts",
      },
      xAxis: {
        data: this.chartOptions.xAxisKeys,
      },
      yAxis: {},
      series: [
        {
          name: "Test",
          type: this.chartOptions.type,
          data: this.chartOptions.values,
        },
      ],
    });
  }
}
