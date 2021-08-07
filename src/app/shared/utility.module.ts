import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionDialogComponent } from "./components/action-dialog/action-dialog.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
   declarations: [ActionDialogComponent],
   imports: [CommonModule, MatCardModule, MatButtonModule],
   exports: [ActionDialogComponent],
})
export class UtilityModule {}
