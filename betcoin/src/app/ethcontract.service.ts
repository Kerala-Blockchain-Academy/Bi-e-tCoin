import { Injectable } from "@angular/core";
import * as Web3 from "web3";
import * as TruffleContract from "truffle-contract";

declare let require: any;
declare let window: any;
// BetCoin related contract objects
let RAM = require("../../../build/contracts/BetCoin.json");
let ICO = require("../../../build/contracts/ICORegistration.json");
let WAGER = require("../../../build/contracts/Wager.json");

@Injectable({
  providedIn: "root"
})

//This class act as an interface between angular component and ethereum network
export class EthcontractService {
  private web3Provider: null;
  private contracts: {};
  private currAccount;
  private contractInstance: any;
  // This initiate the web3 component
  constructor() {
    debugger;
    if (typeof window.web3 !== "undefined") {
      this.web3Provider = window.web3.currentProvider;
    } else {
      this.web3Provider = new Web3.providers.HttpProvider(
        "http://localhost:8545"
      );
    }
    let that = this;
    window.web3 = new Web3(this.web3Provider);
    window.ethereum.on("accountsChanged", function(accounts) {
      that.currAccount = accounts;
    });
    debugger;
    var version = window.web3.version.api;
    
    this.getAccountInfo();
    
  }
  // Getter function to return web3 instance
  returnWeb3Instance() {
    return window.web3;
  }
  // Getter function to return contract instance
  returnContractInstance() {
    return this.contractInstance;
  }
  // Getter function to return current account
  returnCurrentAccount() {
    return this.currAccount;
  }
  // Function to create a new account as escrow account
  createNewAccount(passpharse) {
    return new Promise((resolve, reject) => {
      window.web3.personal.newAccount(passpharse, function(err, account) {
        if (err === null) {
          if (err === null) {
            debugger;
            return resolve({
              fromAccount: account
            });
          } else {
            debugger;
            return reject({ fromAccount: "Error while creating new account" });
          }
        }
      });
    });
  }
  // Retrive account information
  getAccountInfo() {
    let that = this;
    debugger;
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
        debugger;
        if (err === null) {
          that.currAccount = account;
          window.web3.eth.getBalance(account, function(err, balance) {
            if (err === null) {
              return resolve({
                fromAccount: account,
                balance: window.web3.fromWei(balance, "ether").toNumber()
              });
            } else {
              return reject({ fromAccount: "Error while getting account info", balance: 0 });
            }
          });
        }
      });
    });
  }
  // Return contract address for a given contract
  returnContractAddress(_contractName) {
    debugger;
    let that = this;
    let contractInstance = require("../../../build/contracts/" +
      _contractName +
      ".json");
    return new Promise((resolve, reject) => {
      let betCoinContract = TruffleContract(contractInstance);
      betCoinContract.setProvider(this.web3Provider);
      betCoinContract.deployed().then(function(instance) {
        that.contractInstance = instance;
        localStorage.setItem("BetCoinOwner", instance.address);
        debugger;
        return resolve(instance.address);
      });
    });
  }
  // Return dealer address
  returnDealerAddress() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(RAM);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.returnDealerAddress();
        })
        .then(function(status) {
          debugger;
          localStorage.setItem("BetCoinDealer", status);
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error while getting dealer address");
        });
    });
  }
  // Returb token name
  returnTokenName() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(RAM);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          return instance.returnName();
        })
        .then(function(status) {
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error while getting token name");
        });
    });
  }

  // Return token value
  returnTokenValue(addr) {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(RAM);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          return instance.returnTokenStatus(addr);
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error while getting token value");
        });
    });
  }

  // Return token sysmbol
  returnTokenSymbol() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(RAM);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          return instance.returnsymbol();
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error while getting token symbol");
        });
    });
  }
  // Check to see an address exists in contract
  returnAddressExists(_addr) {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(RAM);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          return instance.addressExists(_addr);
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in Address Exists function");
        });
    });
  }

  
  // Initiate a new ICO
  newICO(_transferTo) {
    let that = this;
    debugger;
    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(RAM);
      paymentContract.setProvider(that.web3Provider);

      paymentContract
        .deployed()
        .then(function(instance) {
          debugger;

          return instance.newICO(_transferTo, {
            from: that.currAccount,
            token: 1000
          });
        })
        .then(function(status) {
          debugger;
          if (status) {
            return resolve( status);
          }
        })
        .catch(function(error) {
          debugger;
          console.log(error);

          return reject("Error in newICO function");
        });
    });
  }
  // Return total supply of the BetCoin
  totalSupply() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(RAM);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          return instance.totalSupply();
        })
        .then(function(status) {
          debugger;
          console.log(status);
          if (status) {
           return resolve( status);
           }
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in totalSupply function");
        });
    });
  }
  // Return balance token
  balanceToken(_transferFrom) {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(RAM);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          return instance.balanceOf(_transferFrom);
        })
        .then(function(status) {
          debugger;

          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in balanceToken function");
        });
    });
  }
  // Register the address for ICO
  applyForICO(addr) {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(ICO);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.registerForICO(addr, {
            from: that.currAccount
            //from: localStorage.getItem("BetCoinDealer") -- Ramesh
          });
        })
        .then(function(status) {
          debugger;
          return resolve(status); 
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in applyForICO function");
        });
    });
  }
  // Return the ICO list
  returnICOList() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(ICO);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.returnICO();
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in returnICOList function");
        });
    });
  }
  //Wager related calls
  // Create a new wager
  createNewWager(wagerName, wagerToken, escrowAC) {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(WAGER);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          console.log("Wager Name ==>" + wagerName);
          console.log("Wager Escrow Account ==>" + escrowAC);
          return instance.startWager(
            wagerName,
            wagerToken,
            escrowAC,
            localStorage.getItem("BetCoinOwner"),
            {
              from: that.currAccount,
              token: wagerToken
            }
          );
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error while creating a new wager");
        });
    });
  }
  // Check if any wager is active
  retIsItAlive() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(WAGER);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.isItAlive();
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in retIsItAlive function");
        });
    });
  }
  // Function to return wager name
  retWagerName() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(WAGER);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.retWagerName();
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in retWagerName function");
        });
    });
  }
  // Function to return wager cap limit
  retWagerCap() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(WAGER);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.retWagerCap();
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in retWagerCap function");
        });
    });
  }
  // Function to return escrow account for the given wager
  retEscrowAC() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(WAGER);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.retEscrowAC();
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in retEscrowAC function");
        });
    });
  }
  // Return wager owner
  retWagerOwner() {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(WAGER);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.retWagerOwner();
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in retWagerOwner function");
        });
    });
  }
  // Initiate a bid for the seletd wager
  bid(_tokenCnt, _yesOrNo) {
    let that = this;
    debugger;
    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(WAGER);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.bid(that.currAccount, _tokenCnt, _yesOrNo, {
            from: that.currAccount,
            token: _tokenCnt
          });
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in bid function");
        });
    });
  }
  // Close the selected wager
  closeWager(_yesOrNo) {
    let that = this;

    return new Promise((resolve, reject) => {
      let RAMContract = TruffleContract(WAGER);
      RAMContract.setProvider(that.web3Provider);

      RAMContract.deployed()
        .then(function(instance) {
          debugger;
          return instance.closeWager(_yesOrNo, {
            from: that.currAccount,
            token: 10
          });
        })
        .then(function(status) {
          debugger;
          return resolve(status);
        })
        .catch(function(error) {
          console.log(error);

          return reject("Error in closeWager function");
        });
    });
  }
  // Utility function to return a block info
  displayBlockInfo(blockNumber) {
    return new Promise((resolve, reject) => {
      window.web3.eth.getBlock(blockNumber, function(err, account) {
        if (err === null) {
          return resolve({
            retValue: account
          });
        } else {
          debugger;
          return reject({ fromAccount: "Error in displayBlockInfo function" });
        }
      });
    });
  }
}
