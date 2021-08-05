import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
   selector: "app-header",
   templateUrl: "./header.component.html",
   styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
   public text: string = "ChartGen";

   constructor(private _router: Router) {}

   ngOnInit(): void {}

   goBack(): void {
      this._router.navigate([""]);
   }
}
