import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./app-components/header/header.component";
import { LandingComponent } from "./app-components/landing/landing.component";
import { AppRouterModule } from "./app-router.module";
import { AppComponent } from "./app.component";
import { ChartModule } from "./modules/chart/chart.module";
import { MaterialUIModule } from "./modules/material-ui/material-ui.module";
import { PrimeNgModule } from "./modules/prime-ng/prime-ng.module";

@NgModule({
   imports: [ChartModule, AppRouterModule, BrowserModule, MaterialUIModule, PrimeNgModule],
   declarations: [AppComponent, HeaderComponent, LandingComponent],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
