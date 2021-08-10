import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ChartComponent } from "../components/chart/chart.component";
import { ChartService } from "../services/chart.service";

@Injectable({
   providedIn: "root",
})
export class SaveChartGuard implements CanDeactivate<unknown> {
   constructor(private chartService: ChartService) {}

   canDeactivate(
      component: ChartComponent,
      currentRoute: ActivatedRouteSnapshot,
      currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot
   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (component.chart) {
         this.chartService.setCurrentChart(component.chart);
      }
      return true;
   }
}
