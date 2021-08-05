import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { DatasetsType } from "../../../types";

@Component({
   templateUrl: "./chart.component.html",
   styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit, OnDestroy {
   private _chartContainerRef: HTMLDivElement | null = null;
   private _userActionSubject: Subject<any> = new Subject<any>();
   private _subscriptionRef: Subscription | null = null;

   public datasets: DatasetsType[] = [];
   public showUserConfirmDialog: boolean = false;
   public scrollSignal: Subject<any> = new Subject<any>();
   public init: boolean = false;
   public chartControlsSubject: Subject<DatasetsType[]> = new Subject<DatasetsType[]>();

   public constructor() {}

   public ngOnInit(): void {}

   setContainer(container: HTMLDivElement) {
      this._chartContainerRef = container;
   }

   handleChartCreation(datasets: DatasetsType[]) {
      this.datasets = datasets;
      this.chartControlsSubject.next(datasets);
      this.scrollSignal.next();
      this.init = true;
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
      this._subscriptionRef?.unsubscribe();
   }
}
