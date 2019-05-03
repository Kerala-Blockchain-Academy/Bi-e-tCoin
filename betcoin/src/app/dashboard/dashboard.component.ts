import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EthcontractService } from "../ethcontract.service";

@Component({
  //selector: "app-dashboard",
  selector: "app-root",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  continue() {
    this.router.navigate(["home"]);
  }
}
