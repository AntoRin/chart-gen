import { Directive, ElementRef, Input, OnDestroy, OnInit } from "@angular/core";
import { Subject, Subscription } from "rxjs";

@Directive({
  selector: "[appScrollIntoView]",
})
export class ScrollIntoViewDirective implements OnInit, OnDestroy {
  @Input() scrollSignal: Subject<any> | undefined;
  private _subscriptionRef: Subscription | undefined;

  constructor(private _elementRef: ElementRef) {}

  ngOnInit(): void {
    if (!this.scrollSignal) return;

    this._subscriptionRef = this.scrollSignal.asObservable().subscribe(() => {
      const element: HTMLElement = this._elementRef.nativeElement;
      element.style.scrollBehavior = "smooth";
      element.scrollIntoView();
    });
  }

  ngOnDestroy(): void {
    this._subscriptionRef?.unsubscribe();
  }
}
