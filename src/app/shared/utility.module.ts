import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionDialogComponent } from "./components/action-dialog/action-dialog.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { AnimateTabDirective } from "./directives/animate-tab.directive";

@NgModule({
   declarations: [ActionDialogComponent, AnimateTabDirective],
   imports: [CommonModule, MatCardModule, MatButtonModule],
   exports: [ActionDialogComponent, AnimateTabDirective],
})
export class UtilityModule {}
