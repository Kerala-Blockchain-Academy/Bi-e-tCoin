import { Component, OnInit } from "@angular/core";
import { EthcontractService } from "../ethcontract.service";

@Component({
  selector: "app-bidding",
  templateUrl: "./community.component.html",
  styleUrls: ["./community.component.css"]
})
//This class deals with the user community of betcoin network
export class CommunityComponent implements OnInit {
  constructor(private ethcontractService: EthcontractService) {}
  private contractOwner: string;
  private userProfitLoss: string;
  private tokenHolding: string;
  private userAddress: string = "";
  private buttonDisabled: boolean;
  private arrayGroup: string[];
  private userAccount: string;
  private eventMsg: string;
  // Initialize all users from ICO
  ngOnInit() {
   // Initiate event capturing process
    let web3 = this.ethcontractService.returnWeb3Instance();
    var MyContract = web3.eth.contract(
      this.ethcontractService.returnContractInstance().abi
    );
    var myContractInstance = MyContract.at(
      this.ethcontractService.returnContractInstance().address
    );

   // subscribe to events
    var myEvent = myContractInstance.allEvents({
      fromBlock: 0,
      toBlock: "latest",
      function(error, result) {
         console.log(result);
       
      }
    });
    // process the events
    myEvent.get(function(error, events) {
      if (error) console.log("Error getting events: " + error);
      else console.log(events);
    });
    // process the events
    myEvent.watch(function(error, result) {
      debugger;
      console.log(result);
         });

    this.buttonDisabled = false;

    this.contractOwner = localStorage.getItem("BetCoinOwner");
    let that = this;
    // Return the list of ICO  from contract
    this.ethcontractService
      .returnICOList()
      .then(function(retvalue: any) {
        debugger;
        console.log("Return value from Community 1==>" + retvalue);
        let temp = retvalue.toString().split(",");
        that.arrayGroup = temp.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        });
      })
      .catch(function(error) {
        console.log("Error from Community 1==>" + error);
      });
  }

  onChange(event) {
    // do nothing

    debugger;
    if (this.userAccount === "" || this.userAccount == null) return;
    if (
      localStorage.getItem("BetCoinDealer") !==
      this.ethcontractService.returnCurrentAccount()
    ) {
      /// this.buttonDisabled = true;
      return;
    }
    /// this.buttonDisabled = true;
    let that = this;
    this.ethcontractService
      .returnAddressExists(this.userAccount)
      .then(function(retValue: any) {
        debugger;
        //that.buttonDisabled = retValue;
        console.log("Return value from Community 2==>" + retValue);
      })
      .catch(function(error) {
        console.log("Error from Community 2==>" + error);
      });
  }
  // Initiate the ICO process
  newICO(event) {
    ///this.buttonDisabled = true;
    let that = this;
    that.ethcontractService
      .newICO(that.userAccount)
      .then(function(retValue: any) {
        that.eventMsg = "Block Number = " +   retValue.receipt.blockNumber + "  Gas Used = " + retValue.receipt.gasUsed + " From = " +
        retValue.receipt.from + "  To = " + retValue.receipt.to;
      })
      .catch(function(error) {
        console.log("Error from Community 3==>" + error);
      });
  }

  // Check to see the address is already in ICO
  lookup(event) {
    let that = this;
    that.tokenHolding = "";
    that.userProfitLoss = "";
    debugger;
    if (this.userAccount === "") return;
    this.ethcontractService
      .returnAddressExists(this.userAccount)
      .then(function(retValue: any) {
        debugger;
        console.log("Return value from Community 4==>" + retValue);
        that.buttonDisabled = retValue;
        if (retValue) {
          that.ethcontractService
            .balanceToken(that.userAccount)
            .then(function(retValue: any) {
              console.log("Return value from Community 5==>" + retValue);
              that.tokenHolding = retValue;
              that.ethcontractService
                .returnTokenValue(that.userAccount)
                .then(function(retValue: any) {
                  console.log("Return value from Community 6==>" + retValue);
                  that.userProfitLoss = retValue;
                })
                .catch(function(error) {
                  console.log("Error from Community 6==>" + error);
                });
            })
            .catch(function(error) {
              console.log("Error from Community 5==>" + error);
            });
        }
      })
      .catch(function(error) {
        console.log("Error from Community 4==>" + error);
      });
  }
}
