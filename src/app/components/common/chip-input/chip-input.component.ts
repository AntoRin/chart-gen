import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ENTER, COMMA, SPACE } from "@angular/cdk/keycodes";

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

  readonly chipKeyCodes = [ENTER, COMMA, SPACE] as const;

  public inputField: string;

  constructor() {
    this.chipList = [];
    this.inputField = "";
    this.label = "";
  }

  ngOnInit(): void {}

  addNewKey() {
    if (!this.inputField) return;
    this.chipEvent.emit(this.inputField);
    this.inputField = "";
  }

  removeKey(keyIdx: number) {
    this.chipRemoveEvent.emit(keyIdx);
  }
}
