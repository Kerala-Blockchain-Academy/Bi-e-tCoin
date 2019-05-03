import { Component, OnInit } from "@angular/core";
import { EthcontractService } from "../ethcontract.service";

@Component({
  selector: "app-dealer",
  templateUrl: "./dealer.component.html",
  styleUrls: ["./dealer.component.css"]
})
// This class deals with the attributes of dealers
export class DealerComponent implements OnInit {
  constructor(private ethcontractService: EthcontractService) {}
  private tokenAddress: string = "";
  private tokenName: string = "";
  private tokenSymbol: string = "";
  private dealerAddress: string = "";
  private dealerHolding: number = 0;
  private tokenValue: number = 0;
  // On startup fetch all the coin related info
  ngOnInit() {
    let that = this;
    this.ethcontractService
      .returnContractAddress("BetCoin")
      .then(function(retValue: any) {
        that.tokenAddress = retValue;
        console.log("Return value from dealer 1==>" + retValue);
      })
      .catch(function(error) {
        console.log("Error from dealer 1==>" + error);
      });
    this.ethcontractService
      .returnTokenName()
      .then(function(retValue: any) {
        console.log("Return value from dealer 2==>" + retValue);
        that.tokenName = retValue;
      })
      .catch(function(error) {
        console.log("Error from dealer 2==>" + error);
      });

    this.ethcontractService
      .returnTokenSymbol()
      .then(function(retValue: any) {
        console.log("Return value from dealer 3==>" + retValue);
        that.tokenSymbol = retValue;
      })
      .catch(function(error) {
        console.log("Error from dealer 3==>" + error);
      });

    this.ethcontractService.returnDealerAddress().then(function(retValue: any) {
      console.log("Return value from dealer 4==>" + retValue);
      that.dealerAddress = retValue;
      that.ethcontractService
        .returnTokenValue(that.dealerAddress)
        .then(function(retValue: any) {
          that.tokenValue = retValue;
          console.log("Return value from dealer 6==>" + retValue);
        })
        .catch(function(error) {
          console.log("Error from dealer 6==>" + error);
        });
      that.ethcontractService
        .balanceToken(that.dealerAddress)
        .then(function(retValue: any) {
          console.log("Return value from dealer 5==>" + retValue);
          that.dealerHolding = retValue;
        })
        .catch(function(error) {
          console.log("Error from dealer 5==>" + error);
        });
    });
  }
}
