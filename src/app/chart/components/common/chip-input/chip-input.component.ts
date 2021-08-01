import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ENTER, COMMA, SPACE } from "@angular/cdk/keycodes";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { ChipInputEditorComponent } from "./chip-input-editor.component";
import { Subscription } from "rxjs";

@Component({
   selector: "app-chip-input",
   templateUrl: "./chip-input.component.html",
   styleUrls: ["./chip-input.component.css"],
})
export class ChipInputComponent implements OnInit {
   @Input() label: string;
   @Input() chipList: string[];
   @Input() includeBtn: boolean = false;
   @Output() chipEvent: EventEmitter<string> = new EventEmitter<string>();
   @Output() chipRemoveEvent: EventEmitter<number> = new EventEmitter<number>();
   @Output() chipModifyEvent: EventEmitter<{ index: number; value: string }> = new EventEmitter<{
      index: number;
      value: string;
   }>();

   public readonly chipKeyCodes = [ENTER, COMMA, SPACE] as const;

   public inputField: string;

   constructor(private _bottomSheet: MatBottomSheet) {
      this.chipList = [];
      this.inputField = "";
      this.label = "";
   }

   ngOnInit(): void {}

   addNewKey(htmlElement?: HTMLElement) {
      if (!this.inputField) return;
      this.chipEvent.emit(this.inputField);
      this.inputField = "";

      if (htmlElement) htmlElement.focus();
   }

   removeKey(keyIdx: number) {
      this.chipRemoveEvent.emit(keyIdx);
   }

   enableChipEditing(keyIdx: number) {
      this._bottomSheet.open(ChipInputEditorComponent, { hasBackdrop: true, autoFocus: true });
      const subscriptionRef: Subscription | undefined = this._bottomSheet._openedBottomSheetRef
         ?.afterDismissed()
         .subscribe((newValue: string) => {
            this.chipModifyEvent.emit({ index: keyIdx, value: newValue });
            subscriptionRef?.unsubscribe();
         });
   }
}
