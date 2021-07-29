import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { ChartComponent } from "./components/chart/chart.component";
import { ChartContainerDirective } from "./directives/chart-container.directive";
import { ChartControlComponent } from "./components/chart-control/chart-control.component";
import { FormsModule } from "@angular/forms";
import {} from "@angular/platform-browser";
import { MaterialUIModule } from "./material-ui/material-ui.module";

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartContainerDirective,
    ChartControlComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
