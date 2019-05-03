var BetCoin = artifacts.require("./BetCoin.sol");
var ICORegistration = artifacts.require("./ICORegistration.sol");
var Wager = artifacts.require("./Wager.sol");

module.exports = function(deployer) {
  deployer.deploy(BetCoin);
  deployer.deploy(ICORegistration);
  deployer.deploy(Wager);
};
