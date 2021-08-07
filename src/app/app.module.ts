import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HeaderComponent } from "./app-components/header/header.component";
import { LandingComponent } from "./app-components/landing/landing.component";
import { AppRouterModule } from "./app-router.module";
import { AppComponent } from "./app.component";
import { ChartModule } from "./chart/chart.module";

@NgModule({
   imports: [ChartModule, AppRouterModule, BrowserModule],
   declarations: [AppComponent, HeaderComponent, LandingComponent],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
