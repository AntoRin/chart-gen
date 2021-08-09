import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import * as echart from "echarts";
import { Subject, Subscription } from "rxjs";
import { Chart } from "../../../interfaces/Chart";
import { ChartOptions } from "../../../interfaces/ChartOptions";
import { GlobalOptions } from "../../../interfaces/GlobalOptions";
import { DatasetsType } from "../../../types";

@Directive({
   selector: "[appChartContainer]",
})
export class ChartContainerDirective implements OnInit, OnDestroy {
   @Input() controlSignal: Subject<Chart> | undefined;
   @Output() accessContainer: EventEmitter<HTMLDivElement> = new EventEmitter<HTMLDivElement>();

   private _subscriptionRef: Subscription | undefined;
   private datasets: DatasetsType[] = [];
   private _globalOptions: GlobalOptions = {} as GlobalOptions;
   public containerElement: HTMLDivElement;
   public chartInstance: echart.ECharts | undefined;

   constructor(private _elementRef: ElementRef) {
      const element: HTMLDivElement = this._elementRef.nativeElement;
      this.containerElement = element;
   }

   ngOnInit(): void {
      this.accessContainer.emit(this.containerElement);
      if (this.controlSignal)
         this._subscriptionRef = this.controlSignal.asObservable().subscribe((chart: Chart) => {
            this.datasets = chart.datasets;
            this._globalOptions = chart.globalOptions;
            this._createChart();
         });
   }

   private _createChart(): void {
      if (!this.datasets.length) return;

      if (!this.chartInstance) this.chartInstance = echart.init(this.containerElement);
      else this.chartInstance.clear();

      const series: any[] = this._createSeries();
      console.log(series);

      const options = {
         title: {
            text: this._globalOptions.chartTitle,
         },
         tooltip: {},
         legend: {},
         dataZoom: [
            {
               type: "inside",
               disabled: !this._globalOptions.enableZoom,
            },
         ],
         backgroundColor: this._globalOptions.backgroundColor,
         xAxis: {
            type: this._globalOptions.xAxisType,
            data: this._globalOptions.xCategories,
            name: this._globalOptions.xName,
         },
         yAxis: {
            type: this._globalOptions.yAxisType,
            data: this._globalOptions.yCategories,
            name: this._globalOptions.yName,
         },
         series,
      };

      this.chartInstance.setOption(options);
   }

   private _createSeries(): any[] {
      let series: any[] = [];

      for (const dataset of this.datasets) {
         const chartOptions: ChartOptions = dataset.chartOptions;
         let data: any[] = [];

         if (this._globalOptions.xAxisType === "value" && this._globalOptions.yAxisType === "value") {
            chartOptions.xAxisKeys.forEach((x, i) => {
               data.push([Number(x), Number(chartOptions.yAxisKeys[i])]);
            });
         } else {
            data =
               this._globalOptions.xAxisType === "value"
                  ? chartOptions.xAxisKeys.map((val, idx) => ({ name: chartOptions.yAxisKeys[idx], value: Number(val) }))
                  : this._globalOptions.yAxisType === "value"
                  ? chartOptions.yAxisKeys.map((val, idx) => ({ name: chartOptions.xAxisKeys[idx], value: Number(val) }))
                  : [];
         }

         series.push({
            name: chartOptions.seriesName,
            type: chartOptions.type,
            data,
            label: {
               show: true,
            },
         });
      }

      return series;
   }

   ngOnDestroy() {
      this._subscriptionRef?.unsubscribe();
   }
}
