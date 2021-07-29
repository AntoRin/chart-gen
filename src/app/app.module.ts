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
import { ChipInputComponent } from './components/common/chip-input/chip-input.component';
import { ScrollIntoViewDirective } from './directives/scroll-into-view.directive';
import { HeaderComponent } from './components/common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartContainerDirective,
    ChartControlComponent,
    ChipInputComponent,
    ScrollIntoViewDirective,
    HeaderComponent,
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
