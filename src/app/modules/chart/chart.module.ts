import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChartContainerDirective } from "./directives/chart-container.directive";
import { ScrollIntoViewDirective } from "./directives/scroll-into-view.directive";
import { ChartControlComponent } from "./components/chart-control/chart-control.component";
import { ChartComponent } from "./components/chart/chart.component";
import { ChipInputEditorComponent } from "./components/common/chip-input/chip-input-editor.component";
import { ChipInputComponent } from "./components/common/chip-input/chip-input.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialUIModule } from "../material-ui/material-ui.module";
import { ChartRouterModule } from "./chart-router.module";
import { UtilityModule } from "../../shared/utility.module";
import { ChartListComponent } from "./components/chart-list/chart-list.component";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";

@NgModule({
   imports: [
      ChartRouterModule,
      CommonModule,
      BrowserModule,
      FormsModule,
      BrowserAnimationsModule,
      MaterialUIModule,
      PrimeNgModule,
      UtilityModule,
   ],
   declarations: [
      ChartComponent,
      ChartContainerDirective,
      ChartControlComponent,
      ChipInputComponent,
      ScrollIntoViewDirective,
      ChipInputEditorComponent,
      ChartListComponent,
   ],
   exports: [ChartRouterModule, ChartComponent],
})
export class ChartModule {}
