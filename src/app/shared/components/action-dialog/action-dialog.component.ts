import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Component({
   selector: "app-action-dialog",
   templateUrl: "./action-dialog.component.html",
   styleUrls: ["./action-dialog.component.css"],
})
export class ActionDialogComponent implements OnInit, OnDestroy {
   private _actionStatusSubject: Subject<string>;

   public title: string;
   public message: string;
   public footer: string;
   public actions: string[];
   public actionStatus$: Observable<string>;
   public isOpen: boolean;

   constructor() {
      this.title = "";
      this.message = "";
      this.footer = "";
      this.actions = [];
      this._actionStatusSubject = new Subject<string>();
      this.actionStatus$ = this._actionStatusSubject.asObservable();
      this.isOpen = false;
   }

   ngOnInit(): void {}

   open(title: string, message: string, footer: string, actions: string[]): Observable<string> {
      this.title = title;
      this.message = message;
      this.footer = footer;
      this.actions = actions;
      this.isOpen = true;

      return this.actionStatus$;
   }

   close(selectedAction: string): void {
      this.title = "";
      this.message = "";
      this.footer = "";
      this.actions = [];
      this.isOpen = false;
      this._notifyClose(selectedAction);
   }

   private _notifyClose(selectedAction: string): void {
      this._actionStatusSubject.next(selectedAction);
   }

   ngOnDestroy() {
      this._actionStatusSubject.complete();
   }
}
