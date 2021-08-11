import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
   selector: "app-header",
   templateUrl: "./header.component.html",
   styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
   public text: string = "ChartGen";
   public isNavBarOpen: boolean = false;

   constructor(private _router: Router) {}

   ngOnInit(): void {}

   navigateTo(commands: any[]): void {
      this._router.navigate(commands);
      this.isNavBarOpen = false;
   }

   isRouteActive(route: string): boolean {
      return this._router.url === route;
   }
}
