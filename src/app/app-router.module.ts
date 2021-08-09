import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LandingComponent } from "./app-components/landing/landing.component";

@NgModule({
   declarations: [],
   imports: [
      RouterModule.forRoot(
         [
            {
               path: "",
               component: LandingComponent,
               pathMatch: "full",
            },
            {
               path: "**",
               redirectTo: "",
            },
         ],
         { anchorScrolling: "enabled" }
      ),
   ],
   exports: [RouterModule],
})
export class AppRouterModule {}
