import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChartComponent } from "./components/chart/chart.component";

@NgModule({
   declarations: [],
   imports: [
      RouterModule.forChild([
         {
            path: "chart",
            component: ChartComponent,
         },
         {
            path: "**",
            redirectTo: "chart",
         },
      ]),
   ],
   exports: [RouterModule],
})
export class ChartRouterModule {}
