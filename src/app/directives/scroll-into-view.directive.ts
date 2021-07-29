import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[appScrollIntoView]",
})
export class ScrollIntoViewDirective implements OnChanges, OnDestroy {
  @Input() scroll: string | null;

  constructor(private _elementRef: ElementRef) {
    this.scroll = null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (!this.scroll) return;
    const element: HTMLElement = this._elementRef.nativeElement;
    element.scrollIntoView();
  }

  ngOnDestroy(): void {}
}
