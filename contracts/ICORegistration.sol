pragma solidity ^0.5.0;
// Contract to hold the ICO registration
contract ICORegistration {
    address[]  ICO;
// Function add the external user account to the ICO registration list   
function registerForICO(address addr) public  returns (bool success) {
ICO.push(addr);
return true;
}
// Getter to return the list of all ICO address
function returnICO() public view returns (address[] memory) {
    return ICO;
}
}