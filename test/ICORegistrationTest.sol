pragma solidity ^0.5.0;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ICORegistration.sol";
// Test for ICORegistration
contract ICORegistrationTest {
    // Register an address for ICO and use the getter function to check the return value
function testInitial() public {
    ICORegistration ICO = ICORegistration(DeployedAddresses.ICORegistration());
    ICO.registerForICO(msg.sender);
    address[] memory ret;
    ret=ICO.returnICO();
    Assert.equal(ret[0], msg.sender, "Return address is same");
  }
}