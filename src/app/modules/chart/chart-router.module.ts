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
      ]),
   ],
   exports: [RouterModule],
})
export class ChartRouterModule {}
