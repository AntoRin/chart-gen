import { Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";

@Directive({
   selector: "[appAnimateTab]",
})
export class AnimateTabDirective implements OnInit, OnChanges {
   private _isAnimationActive: boolean = false;
   private _element: HTMLElement;
   private _elementOpacity: number = 1;
   private _diff: number = 0.1;
   private _timeoutId: number | undefined;
   private _timeoutDuration: number = 1;

   @Output() animationChange: EventEmitter<boolean> = new EventEmitter<boolean>();

   get animation(): boolean {
      return this._isAnimationActive;
   }

   @Input()
   set animation(newState: boolean) {
      this._isAnimationActive = newState;
      this.animationChange.emit(this._isAnimationActive);
   }

   get opacity(): number {
      return this._elementOpacity;
   }

   set opacity(value: number) {
      this._elementOpacity = value;
      this._element.style.opacity = value + "";
   }

   constructor(private _elementRef: ElementRef) {
      this._element = this._elementRef.nativeElement;
   }

   ngOnInit(): void {}

   ngOnChanges(): void {
      if (!this.animation) return;
      this._animate();
   }

   private async _animate(): Promise<void> {
      this.opacity = +window.getComputedStyle(this._element).getPropertyValue("opacity");
      this._diff = (10 / 100) * this._elementOpacity;
      try {
         while (this.opacity >= 0) {
            await new Promise((resolve, reject) => {
               this._timeoutId = window.setTimeout(() => {
                  if (!this.animation) return reject();
                  this.opacity -= this._diff;
                  resolve("");
               }, this._timeoutDuration);
            });
         }

         while (this.opacity <= 1) {
            await new Promise((resolve, reject) => {
               this._timeoutId = window.setTimeout(() => {
                  if (!this.animation) return reject();
                  this.opacity += this._diff;
                  resolve("");
               }, this._timeoutDuration);
            });
         }

         return this._endAnimation();
      } catch (error: any) {
         return this._endAnimation();
      }
   }

   private _endAnimation(): void {
      this.animation = false;
      clearTimeout(this._timeoutId);
   }
}
