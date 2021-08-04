import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from "@angular/core";
import * as echart from "echarts";
import { Subject } from "rxjs";
import { ChartOptions } from "../../interfaces/ChartOptions";
import { DatasetsType } from "../../types";

@Directive({
   selector: "[appChartContainer]",
})
export class ChartContainerDirective implements OnInit {
   @Input() datasets: DatasetsType[] = [];
   @Input() controlSignal: Subject<boolean> | undefined;
   @Output() accessContainer: EventEmitter<HTMLDivElement> = new EventEmitter<HTMLDivElement>();

   public containerElement: HTMLDivElement;
   public chartInstance: echart.ECharts | undefined;

   constructor(private _elementRef: ElementRef) {
      const element: HTMLDivElement = this._elementRef.nativeElement;
      this.containerElement = element;
   }

   ngOnInit(): void {
      this.accessContainer.emit(this.containerElement);
      if (this.controlSignal)
         this.controlSignal.subscribe(() => {
            this._createChart();
         });
   }

   private _createChart(): void {
      if (!this.datasets.length) return;

      if (!this.chartInstance) this.chartInstance = echart.init(this.containerElement);
      else this.chartInstance.clear();

      let series: any[] = [];

      for (const dataset of this.datasets) {
         const chartOptions: ChartOptions = dataset.chartOptions;
         let data: any[] = [];

         if (chartOptions.xAxisType === "value" && chartOptions.yAxisType === "value") {
            chartOptions.xAxisKeys.forEach((x, i) => {
               data.push([Number(x), Number(chartOptions.yAxisKeys[i])]);
            });
         } else {
            data =
               chartOptions.xAxisType === "value"
                  ? chartOptions.xAxisKeys.map(val => Number(val))
                  : chartOptions.yAxisType === "value"
                  ? chartOptions.yAxisKeys.map(val => Number(val))
                  : [];
         }

         series.push({
            name: "",
            type: this.datasets[0].chartOptions.type,
            data,
         });
      }

      const options = {
         title: {
            text: this.datasets[0].chartOptions.title || "Chart",
         },
         dataZoom: [
            {
               type: "inside",
               disabled: !this.datasets[0].chartOptions.enableZoom,
            },
         ],
         backgroundColor: this.datasets[0].chartOptions.backgroundColor,
         xAxis: {
            type: this.datasets[0].chartOptions.xAxisType,
            data: this.datasets[0].chartOptions.xAxisKeys,
         },
         yAxis: {
            type: this.datasets[0].chartOptions.yAxisType,
            data: this.datasets[0].chartOptions.yAxisKeys,
         },
         series,
      };

      this.chartInstance.setOption(options);
   }
}
