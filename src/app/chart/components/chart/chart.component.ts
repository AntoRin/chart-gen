import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { ChartOptions } from "../../../interfaces/ChartOptions";

@Component({
   selector: "app-chart",
   templateUrl: "./chart.component.html",
   styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit, OnDestroy {
   public chartOptions: ChartOptions;
   public init: boolean;
   public showUserConfirmDialog: boolean;
   public scrollSignal: Subject<any>;
   private _chartContainerRef: HTMLDivElement | null;
   private _userActionSubject: Subject<any>;
   private _subscriptionRef: Subscription | null;

   public constructor() {
      this.chartOptions = {} as ChartOptions;
      this.init = false;
      this._chartContainerRef = null;
      this.showUserConfirmDialog = false;
      this.scrollSignal = new Subject<any>();
      this._userActionSubject = new Subject<any>();
      this._subscriptionRef = null;
   }

   public ngOnInit(): void {}

   handleChartCreation(options: ChartOptions) {
      this.chartOptions = options;
      this.init = true;
      this.scrollSignal.next();
   }

   setContainer(container: HTMLDivElement) {
      this._chartContainerRef = container;
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
