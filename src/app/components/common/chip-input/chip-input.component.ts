import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-chip-input",
  templateUrl: "./chip-input.component.html",
  styleUrls: ["./chip-input.component.css"],
})
export class ChipInputComponent implements OnInit {
  @Input() label: string;
  @Input() chipList: string[];
  @Output() chipEvent: EventEmitter<string[]> = new EventEmitter<string[]>();

  public inputField: string;

  constructor() {
    this.chipList = [];
    this.inputField = "";
    this.label = "";
  }

  ngOnInit(): void {}

  addNewKey() {
    if (!this.inputField) return;
    this.chipList.push(this.inputField);
    this.inputField = "";
    this.chipEvent.emit(this.chipList);
  }

  removeKey(keyIdx: number) {
    this.chipList.splice(keyIdx, 1);
    this.chipEvent.emit(this.chipList);
  }
}
