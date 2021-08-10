import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { Chart } from "../../../../interfaces/Chart";
import { ChartService } from "../../services/chart.service";

@Component({
   templateUrl: "./chart.component.html",
   styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit, OnDestroy {
   private _chartContainerRef: HTMLDivElement | null = null;
   private _userActionSubject: Subject<any> = new Subject<any>();
   private _subscriptionRef: Subscription | null = null;
   private _chartControlsSubject: Subject<Chart> = new Subject<Chart>();

   public chart: Chart | undefined;
   public chartTitle: string = "";
   public showUserConfirmDialog: boolean = false;
   public scrollSignal: Subject<any> = new Subject<any>();
   public init: boolean = false;
   public chartControl$: Observable<Chart> = this._chartControlsSubject.asObservable();

   public constructor(private chartService: ChartService) {}

   public ngOnInit(): void {}

   setContainer(container: HTMLDivElement) {
      this._chartContainerRef = container;
   }

   handleChartCreation(chart: Chart) {
      this.chart = { ...chart };
      this.chartTitle = this.chart.globalOptions.chartTitle;
      this._chartControlsSubject.next(this.chart);
      this.scrollSignal.next();
      this.init = true;
   }

   saveCanvasToLocalStorage(): void {
      if (!this.chart) return;

      this.chartService.saveChartToLocalStorage(this.chart);
   }

   downloadCanvas(): void {
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
      this._subscriptionRef?.unsubscribe();
   }
}
