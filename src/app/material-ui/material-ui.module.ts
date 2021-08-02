import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

@NgModule({
   declarations: [],
   imports: [CommonModule],
   exports: [
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
      MatIconModule,
      MatChipsModule,
      MatTooltipModule,
      MatCardModule,
      MatButtonToggleModule,
      MatBottomSheetModule,
      MatSnackBarModule,
      MatToolbarModule,
      MatTabsModule,
      MatListModule,
      MatSlideToggleModule,
   ],
})
export class MaterialUIModule {}
