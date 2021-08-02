import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";
import * as echart from "echarts";
import { ChartOptions } from "../../interfaces/ChartOptions";

@Directive({
   selector: "[appChartContainer]",
})
export class ChartContainerDirective implements OnInit, OnChanges {
   @Input() chartOptions: ChartOptions = {} as ChartOptions;
   @Input() init: boolean = false;
   @Output() accessContainer: EventEmitter<HTMLDivElement> = new EventEmitter<HTMLDivElement>();

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
      if (!this.init || !Object.getOwnPropertyNames(this.chartOptions).length) return;

      if (!this.chartInstance) this.chartInstance = echart.init(this.containerElement);
      else this.chartInstance.clear();

      let data: any[] = [];

      if (this.chartOptions.xAxisType === "value" && this.chartOptions.yAxisType === "value") {
         this.chartOptions.xAxisKeys.forEach((x, i) => {
            data.push([Number(x), Number(this.chartOptions.yAxisKeys[i])]);
         });
      } else {
         data =
            this.chartOptions.xAxisType === "value"
               ? this.chartOptions.xAxisKeys.map(val => Number(val))
               : this.chartOptions.yAxisType === "value"
               ? this.chartOptions.yAxisKeys.map(val => Number(val))
               : [];
      }

      this.chartInstance.setOption({
         title: {
            text: this.chartOptions.title || "Chart",
         },
         xAxis: {
            type: this.chartOptions.xAxisType,
            data: this.chartOptions.xAxisKeys,
         },
         yAxis: {
            type: this.chartOptions.yAxisType,
            data: this.chartOptions.yAxisKeys,
         },
         series: [
            {
               name: "",
               type: this.chartOptions.type,
               data,
            },
         ],
      });
   }
}
