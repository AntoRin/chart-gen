import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { ChartOptions } from "../../interfaces/ChartOptions";

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"],
})
export class ChartComponent implements OnInit, OnDestroy {
  public chartOptions: ChartOptions = {} as ChartOptions;
  public init: boolean = false;
  public scroll: string | null = null;
  public chartContainerRef: HTMLDivElement | null = null;
  public showUserConfirmDialog: boolean = false;
  public userActionSubject: Subject<any>;
  private _subscriptionRef: Subscription | null = null;

  public constructor() {
    this.userActionSubject = new Subject<any>();
  }

  public ngOnInit(): void {}

  handleChartCreation(options: ChartOptions) {
    this.chartOptions = options;
    this.init = true;
    this.scroll =
      Math.floor(Math.random() * 99999 + 1) +
      btoa(String(Math.floor(Math.random() * 99999 + 1)));
  }

  setContainer(container: HTMLDivElement) {
    this.chartContainerRef = container;
  }

  downloadCanvas() {
    if (!this.chartContainerRef) return;

    const canvas: HTMLCanvasElement | null =
      this.chartContainerRef.querySelector("canvas");

    if (!canvas) return;

    this.showUserConfirmDialog = true;

    this._subscriptionRef = this.userActionSubject
      .asObservable()
      .subscribe((action: any) => {
        if (action.confirm) {
          canvas.toBlob(
            (blob: Blob | null) => {
              if (!blob) return;

              const url: string = URL.createObjectURL(blob);
              const linkElement: HTMLAnchorElement =
                document.createElement("a");
              linkElement.hidden = true;
              linkElement.href = url;
              linkElement.download = action.fileName;
              linkElement.click();
              linkElement.remove();
            },
            "image/png",
            1
          );
        } else {
          this.showUserConfirmDialog = false;
        }

        this._subscriptionRef?.unsubscribe();
      });
  }

  handleUserActionOnDownload(confirm: boolean, fileName: string | null = null) {
    this.userActionSubject.next({ confirm, fileName });
    this.showUserConfirmDialog = false;
  }

  ngOnDestroy(): void {
    this.init = false;
    this.scroll = null;
    this._subscriptionRef?.unsubscribe();
  }
}
