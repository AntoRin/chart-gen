import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import * as echart from "echarts";
import { ChartOptions } from "../interfaces/ChartOptions";

@Directive({
  selector: "[appChartContainer]",
})
export class ChartContainerDirective implements OnInit, OnChanges {
  @Input() chartOptions: ChartOptions = {} as ChartOptions;
  @Input() init: boolean = false;
  @Output() accessContainer: EventEmitter<HTMLDivElement> =
    new EventEmitter<HTMLDivElement>();

  public containerElement: HTMLDivElement;
  public chartInstance: echart.ECharts | undefined;

  constructor(private _elementRef: ElementRef) {
    const element: HTMLDivElement = this._elementRef.nativeElement;
    this.containerElement = element;
  }

  ngOnInit(): void {
    this.accessContainer.emit(this.containerElement);
  }

  ngOnChanges() {
    if (!this.init || !Object.getOwnPropertyNames(this.chartOptions).length)
      return;

    if (!this.chartInstance)
      this.chartInstance = echart.init(this.containerElement);
    else this.chartInstance.clear();

    this.chartInstance.setOption({
      title: {
        text: this.chartOptions.title || "Chart",
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
