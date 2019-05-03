import { Component, OnInit } from "@angular/core";
import { EthcontractService } from "../ethcontract.service";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
// This class delas with the attributes of the network
export class SettingsComponent implements OnInit {
  constructor(private ethcontractService: EthcontractService) {}
  private blockNumber: string;
  private currAddr: string;
  private balEther:string;
  private txnCnt:string;
  ngOnInit() {}
  // Retrive the network related info
  process(event) {
    let that = this;
    
    this.ethcontractService
      .returnWeb3Instance()
      .eth.getAccounts(function(error, result) {
        debugger;
        if (error) console.log("Error getting events: " + error);
        else 
        {that.currAddr = result;
          that.ethcontractService
          .returnWeb3Instance()
          .eth.getBalance(result[0],function(error, result) {
            debugger;
            if (error) console.log("Error getting events: " + error);
            else that.balEther = (that.ethcontractService
              .returnWeb3Instance().fromWei(result.toNumber(), "ether" ) );
          });
          that.ethcontractService
          .returnWeb3Instance()
          .eth.getTransactionCount(result[0],function(error, result) {
            debugger;
            if (error) console.log("Error getting events: " + error);
            else that.txnCnt = result;
          });
        }
      });
    this.ethcontractService
      .returnWeb3Instance()
      .eth.getBlockNumber(function(error, result) {
        debugger;
        if (error) console.log("Error getting events: " + error);
        else 
        {that.blockNumber = result;
         
    }
      });
      

  }
}
