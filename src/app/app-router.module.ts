import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
   declarations: [],
   imports: [
      RouterModule.forRoot([
         {
            path: "",
            redirectTo: "chart",
            pathMatch: "full",
         },
      ]),
   ],
   exports: [RouterModule],
})
export class AppRouterModule {}
