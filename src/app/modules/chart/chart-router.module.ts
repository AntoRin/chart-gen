import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChartListComponent } from "./components/chart-list/chart-list.component";
import { ChartComponent } from "./components/chart/chart.component";
import { SaveChartGuard } from "./guards/save-chart.guard";

@NgModule({
   declarations: [],
   imports: [
      RouterModule.forChild([
         {
            path: "charts/create",
            component: ChartComponent,
            canDeactivate: [SaveChartGuard],
         },
         {
            path: "charts/saved",
            component: ChartListComponent,
         },
      ]),
   ],
   exports: [RouterModule],
})
export class ChartRouterModule {}
