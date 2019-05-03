import { Component, OnInit } from "@angular/core";
import { EthcontractService } from "../ethcontract.service";

@Component({
  selector: "app-transaction",
  templateUrl: "./transaction.component.html",
  styleUrls: ["./transaction.component.css"]
})
// Utility class to get block details
export class TransactionComponent implements OnInit {
  constructor(private ethcontractService: EthcontractService) {}
  private blockNumber: string;
  private blockDetails: string;
  ngOnInit() {}
  // Get the detail of the selected block
  getBlockDetail(event) {
    let that = this;
    that.ethcontractService
      .displayBlockInfo(this.blockNumber)
      .then(function(retValue: any) {
        console.log("Return value from transaction 1==>" + retValue);
        debugger;
        let temp = JSON.stringify(retValue, null, "\t");
        temp = JSON.stringify(retValue, null, 4);
        that.blockDetails = temp;
      })
      .catch(function(error) {
        console.log("Error from transaction 1==>" + error);
      });
  }
}
