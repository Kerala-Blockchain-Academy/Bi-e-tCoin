pragma solidity ^0.5.0;

// Initialize ERC20 Token
contract ERC20Interface {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Transfer(address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


// Implementation of BetCoin
contract BetCoin is ERC20Interface {
    // Private data
    string  symbol;
    string name;
    uint8 decimals;
    uint _totalSupply;
    address  owner;
    uint ICO;
    uint totalICO;
    // Structure
    address[]  ICORegistration;
    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;
    mapping(address => bool) bidder;
    // Initialize the Token
    constructor() public {
        owner = msg.sender;
        symbol = "B";
        name = "RAM";
        decimals = 18;
        _totalSupply = 100000000 ;
        balances[owner] = _totalSupply;
        ICO=1000;
        totalICO = 0;
        bidder[msg.sender] = true;
        // event for transfer action
        emit Transfer(address(0), owner, _totalSupply);
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    // Apply for the ICO 
    function addToICO(address addr) public  returns (bool success) {
        require( addr != owner );
        ICORegistration.push(addr);
        return true;
    }
    // Calculate profit or loss
    function returnTokenStatus(address addr) public view returns (int256)
    { 
        if ( addr == owner )
        return  ( int256(balances[owner]) + ( int256(totalICO) * int256(ICO) )) - int256(_totalSupply);
             
             else {
               return   int256(balances[addr]) - int256(ICO) ;
            }
    }
    // Getter for token name
    function returnName() public view returns (string memory) {
        return name;
    }
    // Getter for token symbol
    function returnsymbol() public view returns (string memory) {
        return symbol;
    }
    // Getter for dealer address
    function returnDealerAddress() public view returns( address addr)
    {
        return owner;
    }
    // Check a given address is in bidder list
    function addressExists(address addr) public view returns( bool success)
    {
                   return bidder[addr];
    }
    // Getter for total supply
    function totalSupply() public view returns (uint) {
        return _totalSupply - balances[address(0)];
    }
    // Getter for token balance
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }
    // Inialize a ICO
    function newICO(address to) public  returns (bool success) {
        require( to != owner );
        totalICO++ ;
        transfer(to, ICO);
        bidder[to] = true;
        return true;
    }
    // Transfer token from one address to another
    function transfer(address to, uint tokens) public   returns (bool success) {
        require( to != owner );
        require( tokens > 0 );
        balances[msg.sender] = balances[msg.sender]-tokens;
        balances[to] = balances[to]+tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    // Transfer from one address to another - overloaded function
    function transfer(address from ,address to, uint tokens) public   returns (bool success) {
        require( from != to );
        require( tokens > 0 );
        balances[from] = balances[from]-tokens;
        balances[to] = balances[to]+tokens;
        emit Transfer(msg.sender, to, tokens);
        return true;
        
    }
    // not in use
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }
    // not in use
    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = balances[from]-tokens;
        allowed[from][msg.sender] = allowed[from][msg.sender]-tokens;
        balances[to] = balances[to]+tokens;
        emit Transfer(from, to, tokens);
        return true;
    }
    // not in use
    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }
}