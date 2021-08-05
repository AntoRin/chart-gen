import { NgModule } from "@angular/core";
import { ChartModule } from "./chart/chart.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./app-components/header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRouterModule } from "./app-router.module";
import { LandingComponent } from "./app-components/landing/landing.component";

@NgModule({
   imports: [ChartModule, AppRouterModule, BrowserModule],
   declarations: [AppComponent, HeaderComponent, LandingComponent],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
