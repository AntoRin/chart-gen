import { NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { StyleClassModule } from "primeng/styleclass";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ContextMenuModule } from "primeng/contextmenu";
import { SidebarModule } from "primeng/sidebar";
import { CardModule } from "primeng/card";

@NgModule({
   declarations: [],
   imports: [],
   exports: [TableModule, StyleClassModule, DropdownModule, ButtonModule, RippleModule, ContextMenuModule, SidebarModule, CardModule],
})
export class PrimeNgModule {}
