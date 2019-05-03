pragma solidity ^0.5.0;
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BetCoin.sol";

contract BetCoinTest {
// Test for token name
    function testInitial() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
    string memory expected = "RAM";
    Assert.equal(coin.returnName(), expected, "Token name is always RAM");
  }
  // Test for initial token count
  function testInitialToken() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
    uint expected = 100000000;
    Assert.equal(coin.totalSupply(), expected, "Total token is 100000000");
   }

  // Test for balance token
function testBalanceToken() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
    uint expected = 100000000;
    Assert.equal(coin.balanceOf(msg.sender), expected, "Total token is 100000000");
    }

  // Test for balance token after one ICO
  function testBalanceTokenAfterICO() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
    uint expected =  1000;
    coin.addToICO(address(1));
    coin.newICO(address(1));
    Assert.equal(coin.balanceOf(address(1)), expected, "Total token is 1000");
   }
   // Test for Dealer balance after ICO
  function testBalanceDLRTokenAfterICO() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
    uint expected = 100000000 - 1000;
    coin.addToICO(address(1));
    coin.newICO(address(1));
    Assert.equal(coin.balanceOf(coin.returnDealerAddress()), expected, "Total token is 99999000");
  }
  // Test for token balance of a new addr
  function testTransferAddr1() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
    uint expected = 0;
    Assert.equal(coin.balanceOf(address(2)), expected, "Total token is 0");
  }
  // Test for token balance of a new addr
  function testTransferAddr2() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
    uint expected = 0;
    Assert.equal(coin.balanceOf(address(3)), expected, "Total token is 0");
   }
  // Test for transfer
  function testTransferFirst() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
    uint expected = 5;
    coin.transfer(address(3),5);
    Assert.equal(coin.balanceOf(address(3)), expected, "Total token is 5");
    }
// Test for transfer
  function testTransferSecond() public {
    BetCoin coin = BetCoin(DeployedAddresses.BetCoin());
   uint expected = 5;
      coin.transfer(address(3),5);
    Assert.equal(coin.balanceOf(address(3)), expected, "Total token is 5");
    }






  
  
}