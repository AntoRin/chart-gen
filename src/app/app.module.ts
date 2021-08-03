import { NgModule } from "@angular/core";
import { ChartModule } from "./chart/chart.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRouterModule } from "./app-router.module";

@NgModule({
   imports: [AppRouterModule, ChartModule, BrowserModule],
   declarations: [AppComponent, HeaderComponent],
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
