import { Component, OnInit } from "@angular/core";
import { EthcontractService } from "../ethcontract.service";
@Component({
  selector: "app-ico",
  templateUrl: "./ico.component.html",
  styleUrls: ["./ico.component.css"]
})
// This class deals with ICO process
export class IcoComponent implements OnInit {
  constructor(private ethcontractService: EthcontractService) {}
  private applicantAddress: string = "";
  ngOnInit() {}
  // Add the address for pre ICO
  register(event) {
    let that = this;

    this.ethcontractService
      .returnAddressExists(that.applicantAddress)
      .then(function(retValue: any) {
        console.log("Return value from ICO 2==>" + retValue);
        if (retValue) {
          alert("Given address is already in ICO list");
          return;
        } else {
          that.ethcontractService
            .applyForICO(that.applicantAddress)
            .then(function(retValue: any) {
              console.log("Return Value from ICO ==>" + retValue);
            })
            .catch(function(error) {
              console.log("Error from ICO ==>" + error);
            });
        }
      })
      .catch(function(error) {
        console.log("Error from ICO 2==>" + error);
      });
  }
}
