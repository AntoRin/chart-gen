import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Table } from "primeng/table";
import { Chart } from "../../../../interfaces/Chart";
import { ChartService } from "../../services/chart.service";

@Component({
   selector: "app-chart-list",
   templateUrl: "./chart-list.component.html",
   styleUrls: ["./chart-list.component.css"],
})
export class ChartListComponent implements OnInit {
   public charts: Chart[] = [];

   constructor(private router: Router, private chartService: ChartService) {}

   ngOnInit(): void {
      this.charts = this.chartService.getAllChartsFromLocalStorage();
   }

   loadChart(chart: Chart): void {
      this.chartService.setCurrentChart(chart);
      this.router.navigate(["charts", "create"]);
   }

   filterAll(event: Event, chartListTable: Table) {
      chartListTable.filterGlobal((event.target as HTMLInputElement).value, "contains");
   }

   clear(table: Table) {
      table.clear();
   }
}
