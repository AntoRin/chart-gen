import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
   selector: "app-chip-input-editor",
   templateUrl: "./chip-input-editor.component.html",
   styleUrls: ["./chip-input-editor.component.css"],
})
export class ChipInputEditorComponent implements OnInit {
   public newValue: string | number = "";

   constructor(private _bottomSheetRef: MatBottomSheetRef) {}

   ngOnInit(): void {}

   editChipValue() {
      this._bottomSheetRef.dismiss(this.newValue);
   }
}
