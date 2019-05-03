import { Component, OnInit } from "@angular/core";
import { EthcontractService } from "../ethcontract.service";
@Component({
  selector: "app-bidding",
  templateUrl: "./bidding.component.html",
  styleUrls: ["./bidding.component.css"]
})
// This class deals with bidding process for a running wager
export class BiddingComponent implements OnInit {
  constructor(private ethcontractService: EthcontractService) {}
  private escrowAddress: string;
  private buttonDisabled: boolean;
  private arrayGroup: string[];
  private wagerTitle: string;
  private bidSelection: boolean;
  private wagerToken: string;
  onSelectionChange(entry) {
    debugger;
    this.bidSelection = entry;
  }

  // Check to see any wager is already in progress
  ngOnInit() {
    let that = this;
    that.bidSelection = true;
    that.buttonDisabled = true;
    that.ethcontractService
      .retIsItAlive()
      .then(function(retValue: any) {
        console.log("Return value from bidding 1==>" + retValue);
        if (retValue) {
          that.ethcontractService
            .retWagerName()
            .then(function(retValue: any) {
              console.log("Return value from bidding 2==>" + retValue);
              that.arrayGroup = retValue.toString().split(",");
            })
            .catch(function(error) {
              console.log("Error from bidding 2==>" + error);
            });
        }
      })
      .catch(function(error) {
        console.log("Error from bidding 1==>" + error);
      });
  }
  // Return the attributes of the selected wager
  onChange(event) {
    let that = this;
    this.ethcontractService
      .retEscrowAC()
      .then(function(retValue: any) {
        debugger;
        console.log("Return value from bidding 3==>" + retValue);
        that.buttonDisabled = false;
        that.escrowAddress = retValue;
      })
      .catch(function(error) {
        console.log("Error from bidding 3==>" + error);
      });
  }
  // Initiate a bidding process for the selected wager
  bid(event) {
    let that = this;
    this.ethcontractService
      .bid(this.wagerToken, this.bidSelection)
      .then(function(retValue: any) {
        debugger;
        console.log("Return value from bidding 4==>" + retValue);
        that.buttonDisabled = true;
      })
      .catch(function(error) {
        console.log("Error from bidding 4==>" + error);
      });
  }
}
