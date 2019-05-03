import { Component, OnInit } from "@angular/core";
import { EthcontractService } from "../ethcontract.service";

@Component({
  selector: "app-wager",
  templateUrl: "./wager.component.html",
  styleUrls: ["./wager.component.css"]
})
// This class deals with the wager
export class WagerComponent implements OnInit {
  constructor(private ethcontractService: EthcontractService) {}
  private wagerTitle: string;
  private wagerToken: string;
  private wagerAddress: string;
  private escrowAC: string;
  private buttonStartDisabled: boolean;
  private buttonEndDisabled: boolean;
  private wagerClosingState: boolean;
  private passPharse: string;
  private eventMsg: string;
  private escrowACBal: string;
  // Check already a wager is active
  // If yes, load all wager related info
  ngOnInit() {
    this.buttonStartDisabled = false;
    this.buttonEndDisabled = true;
    this.wagerClosingState = true;
    let that = this;

    that.ethcontractService
      .retIsItAlive()
      .then(function(retValue: any) {
        console.log("Return value from wager 1==>" + retValue);
        if (retValue) {
          that.buttonStartDisabled = true;
          that.buttonEndDisabled = false;
          that.ethcontractService
            .retWagerName()
            .then(function(retValue: any) {
              console.log("Return value from wager 2==>" + retValue);
              that.wagerTitle = retValue;
              that.ethcontractService
                .retWagerCap()
                .then(function(retValue: any) {
                  console.log("Return value from wager 3==>" + retValue);
                  that.wagerToken = retValue;
                  that.ethcontractService
                    .retEscrowAC()
                    .then(function(retValue: any) {
                      console.log("Return value from wager 4==>" + retValue);
                      that.ethcontractService
                      .balanceToken(retValue)
                      .then(function(retValue: any) {
                        that.escrowACBal = retValue;
                        console.log("Return value from wager 4.1==>" + retValue);
                        })
                      .catch(function(error) {
                            console.log("Error from wager 4.1==>" + error);
                          });
                    
                      that.escrowAC = retValue;
                      if (that.wagerTitle.length < 10)
                        that.passPharse =
                          that.wagerTitle +
                          Math.random()
                            .toString(36)
                            .substr(2, 10);
                      else that.passPharse = that.wagerTitle.substring(1, 10);
                      debugger;
                      that.ethcontractService
                        .createNewAccount(that.passPharse)
                        .then(function(retValue: any) {
                          console.log(
                            "Return value from wager 5==>" + retValue
                          );
                          debugger;
                          that.ethcontractService
                            .retWagerOwner()
                            .then(function(retValue: any) {
                              console.log(
                                "Return value from wager 6==>" + retValue
                              );
                              that.wagerAddress = retValue;
                            })
                            .catch(function(error) {
                              console.log("Error from wager 6==>" + error);
                            });
                        })
                        .catch(function(error) {
                          console.log("Error from wager 5==>" + error);
                        });
                    })
                    .catch(function(error) {
                      console.log("Error from wager 4==>" + error);
                    });
                })
                .catch(function(error) {
                  console.log("Error from wager 3==>" + error);
                });
            })
            .catch(function(error) {
              console.log("Error from wager 2==>" + error);
            });
        }
      })

      .catch(function(error) {
        console.log("Error from wager 1==>" + error);
      });
  }
  // Start a new wager
  startWager(event) {
    let that = this;
    that.ethcontractService
      .createNewAccount(that.wagerTitle.substring(1, 10))
      .then(function(retValue: any) {
        debugger;
        console.log("Return value from wager 7==>" + retValue.fromAccount);
        that.ethcontractService
          .createNewWager(
            that.wagerTitle,
            that.wagerToken,
            retValue.fromAccount
          )
          .then(function(retValue: any) {
            debugger;
            that.eventMsg = "Block Number = " +   retValue.receipt.blockNumber + "  Gas Used = " + retValue.receipt.gasUsed + " From = " +
            retValue.receipt.from + "  To = " + retValue.receipt.to;
            console.log("Return value from wager 8==>" + retValue);
          })
          .catch(function(error) {
            console.log("Error from wager 8==>" + error);
          });
      })
      .catch(function(error) {
        console.log("Error from wager 7==>" + error);
      });
  }

  // Start a new wager
  endWager(event) {
    let that = this;

    that.ethcontractService
      .closeWager(that.wagerClosingState)
      .then(function(retValue: any) {
        console.log("Return value from wager 9==>" + retValue);
      })
      .catch(function(error) {
        console.log("Error from wager 9==>" + error);
      });
  }

  onSelectionChange(entry) {
    debugger;
    this.wagerClosingState = entry;
  }
}
