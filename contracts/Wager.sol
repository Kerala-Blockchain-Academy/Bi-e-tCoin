pragma solidity ^0.5.0;
// ERC20 coin ref for transffering
import "./BetCoin.sol";
contract Wager 
    {
    address owner;
    address public wagerOwner;
    address public escrowAC;
    uint public wagerCap;
    string public wagerTitle;
    uint public bidTotal = 0;
    bool wagerStarted = false;
    bool wagerEnded = false;
    BetCoin coinInstance;
    // array mapping to hold the bidding address
    mapping(address => uint) public bidYesRecord;
    mapping(address => uint) public bidNoRecord;
    address[] bidYesRecordArray;
    address[] bidNoRecordArray;
    address  coinAddr;

   constructor() public {
        owner = msg.sender;
   }

    // Initialize the wager for a dealer
    function startWager(string memory _wagerTitle, uint _wagerCap, address  _escrowAC, address _coinAddr) public returns (bool success)
    {
        // initialize the ERC20 token contract
        require( _wagerCap > 0 );
        require( _escrowAC != _coinAddr );
        coinInstance = BetCoin(_coinAddr);
        wagerOwner=msg.sender;
        wagerTitle = _wagerTitle;
        wagerCap = _wagerCap;
        wagerStarted = true;
        escrowAC = _escrowAC;
        coinAddr = _coinAddr;
        // Transfer the token from dealer account to escrow account
        coinInstance.transfer(wagerOwner,escrowAC,_wagerCap);
        return true;
    }
    // Return the status of a wager
    function isItAlive() public view returns ( bool)
    {
        return wagerStarted;
      }
    // Return wager name
      function retWagerName() public view returns ( string memory)
      {
          return wagerTitle;
      }
      // Return wager cap
      function retWagerCap() public view returns ( uint)
      {
          return wagerCap;
      }
      // Return escrow account
      function retEscrowAC() public view returns ( address)
      {
          return escrowAC;
      }
      // Return wager owner
      function retWagerOwner() public view returns ( address)
      {
          return wagerOwner;
      }

    // Initiate a bid
    function bid(address _bidder, uint _bidCount, bool typeValue) public returns (bool success)
    {
        require( _bidCount > 0 );
        // set the limit to 80%
        require ( ((wagerCap * 8) / 10)  >  ( bidTotal + _bidCount) );
        bidTotal += _bidCount;
       
        if ( typeValue )
         {
            bidYesRecord[_bidder] = _bidCount;
            bidYesRecordArray.push(_bidder);
         }
        else
        {
            bidNoRecord[_bidder] = _bidCount; 
            bidNoRecordArray.push(_bidder);
        } // initialize the ERC20 token contract
        coinInstance = BetCoin(coinAddr);
        coinInstance.transfer(_bidder,escrowAC,_bidCount);
        return true;
    }
    // close the bid and distribute tokens based on winning bid
    function closeWager(bool closingBell) public payable returns ( bool success)
    {
        // initialize the ERC20 token contract
        coinInstance = BetCoin(coinAddr);
        // process the payout for all yes bids
        if ( closingBell)
        {
            for (uint ctr = 0; ctr < bidYesRecordArray.length; ctr++) {
                address addr = bidYesRecordArray[ctr];
                uint tok = bidYesRecord[addr];
                delete bidYesRecord[addr];
                coinInstance.transfer(escrowAC,addr,tok * 2);
            }

        }
         // process the payout for all no bids
        else {
            for (uint ctr = 0; ctr < bidNoRecordArray.length; ctr++) {
                address addr = bidNoRecordArray[ctr];
                uint tok = bidNoRecord[addr];
                delete bidYesRecord[addr];
                coinInstance.transfer(escrowAC,addr,tok * 2);
            }
 
        }
        // Transfer the rest to dealer
        uint bal = coinInstance.balanceOf(escrowAC);
        if ( bal > 0 )
        {
            // profit for the dealer
            uint profitToDealer = ( bal / 4 );
            coinInstance.transfer(escrowAC,wagerOwner,bal - profitToDealer);
            coinInstance.transfer(escrowAC,owner,profitToDealer);
        }
        reset();
        return true;
    }
    // Reset the wager attributes
    function reset() public returns (bool success)
    {
        bidTotal = 0;
        wagerStarted = false;
        wagerEnded = false;
        delete bidYesRecordArray;
        delete bidNoRecordArray;
        return true;
    }
    
    
}