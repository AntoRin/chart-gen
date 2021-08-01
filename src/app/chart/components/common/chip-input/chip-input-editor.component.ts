import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";

@Component({
   selector: "app-chip-input-editor",
   templateUrl: "./chip-input-editor.component.html",
   styleUrls: ["./chip-input-editor.component.css"],
})
export class ChipInputEditorComponent implements OnInit {
   public newValue: string = "";
   public error: boolean = false;

   constructor(private _bottomSheetRef: MatBottomSheetRef) {}

   ngOnInit(): void {}

   checkError() {
      this.error = !this.newValue;
   }

   editChipValue(): void {
      if (this.error) return;
      this._bottomSheetRef.dismiss(this.newValue);
   }
}
