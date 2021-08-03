import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { ChartOptions } from "../../../interfaces/ChartOptions";
import { DatasetsType } from "../../../types";

@Component({
   templateUrl: "./chart.component.html",
   styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit, OnDestroy {
   private _chartContainerRef: HTMLDivElement | null = null;
   private _userActionSubject: Subject<any> = new Subject<any>();
   private _subscriptionRef: Subscription | null = null;
   public init: boolean = false;
   public showUserConfirmDialog: boolean = false;
   public scrollSignal: Subject<any> = new Subject<any>();
   public chartOptions: ChartOptions = {} as ChartOptions;
   public datasets: DatasetsType[] = [];
   public currentIndex: number = 0;

   public constructor() {
      this.createNewDatasetTab();
   }

   public ngOnInit(): void {}

   private _getDefaultChartOptions(): ChartOptions {
      return {
         backgroundColor: undefined,
         enableZoom: false,
         type: "bar",
         xAxisKeys: [],
         yAxisKeys: [],
         xAxisType: "category",
         yAxisType: "value",
         title: "",
      };
   }

   createNewDatasetTab(): void {
      const newIdx: number = this.datasets.length;
      this.datasets.push({
         chartOptions: this._getDefaultChartOptions(),
         index: newIdx,
         datasetName: "Chart-Tab-" + newIdx,
      });
      this.currentIndex = newIdx;
   }

   setDatasetTab(idx: number) {
      this.currentIndex = idx;
   }

   modifyDataset(dataset: DatasetsType): void {
      this.datasets[dataset.index] = dataset;
   }

   setContainer(container: HTMLDivElement) {
      this._chartContainerRef = container;
   }

   handleChartCreation(options: ChartOptions) {
      this.chartOptions = options;
      this.init = true;
      this.scrollSignal.next();
   }

   downloadCanvas() {
      if (!this._chartContainerRef) return;

      const canvas: HTMLCanvasElement | null = this._chartContainerRef.querySelector("canvas");

      if (!canvas) return;

      this.showUserConfirmDialog = true;

      this._subscriptionRef = this._userActionSubject.asObservable().subscribe((action: any) => {
         if (action.confirm) {
            canvas.toBlob(
               (blob: Blob | null) => {
                  if (!blob) return;

                  const url: string = URL.createObjectURL(blob);
                  const linkElement: HTMLAnchorElement = document.createElement("a");
                  linkElement.hidden = true;
                  linkElement.href = url;
                  linkElement.download = action.fileName;
                  linkElement.click();
                  linkElement.remove();
               },
               "image/png",
               1
            );
         }
         this.showUserConfirmDialog = false;

         this._subscriptionRef?.unsubscribe();
      });
   }

   handleUserActionOnDownload(confirm: boolean, fileName: string | null = null) {
      this._userActionSubject.next({ confirm, fileName });
      this.showUserConfirmDialog = false;
   }

   ngOnDestroy(): void {
      this.init = false;
      this._subscriptionRef?.unsubscribe();
   }
}
