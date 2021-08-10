import { NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { StyleClassModule } from "primeng/styleclass";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ContextMenuModule } from "primeng/contextmenu";

@NgModule({
   declarations: [],
   imports: [],
   exports: [TableModule, StyleClassModule, DropdownModule, ButtonModule, RippleModule, ContextMenuModule],
})
export class PrimeNgModule {}
