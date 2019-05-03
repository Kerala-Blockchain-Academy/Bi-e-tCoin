
pragma solidity ^0.5.0;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Wager.sol";

contract WagerTest {
    function testForLive() public {
    Wager wager = Wager(DeployedAddresses.Wager());
    bool expected = false;
    Assert.equal(wager.isItAlive(), expected, "False is expected");
    }

  function testForStartWager() public {
    Wager wager = Wager(DeployedAddresses.Wager());
    bool expected = false;
    Assert.equal(wager.isItAlive(), expected, "False is expected");
    }

}