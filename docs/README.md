# Bi(e)tCoin #
Welcome to the world of Blockchain. Bi(e)tCoin is a revolutionary coin system based on ERC20 specification. Any wallet user from the same network can buy/alloted tokens from Bi(e)tCoin and use that against betting on a boolean based wager. The dealer/network owner nomally runs the wager. Any community member(s) with Bi(e)tCoin tokens can participate in the wager by bidding. Once a user have  sufficient tokens, the user can start a wager and become a dealer and reap the benefit of gambling. The coin value is determined by the profit/loss incurred by the dealer.
## Install Instruction ##

 ### Prerequsitic softwares ###
1. Install nodejs and web3 as per install instructions.
2. Install ganache as per product install instruction. (Quickly fire up a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates)
3. Install truffle suite as per product install instruction. (The Truffle Suite gets developers from idea to dapp as comfortably as possible)
4. Configure Metamask (allows you to run Ethereum dApps right in your browser without running a full Ethereum node. MetaMask includes a secure identity vault, providing a user interface to manage your identities on different sites and sign blockchain transactions)
5. Get the Bi(e)tCoin Source from GitHub, https://github.com/ramklm/betcoin.git

The default directory structure is
        betcoin        ==> contains dApp in angular
	contracts      ==> List all contracts required by Bi(e)tCoin
	migrations     ==> Truffle related files to deploy contracts to ganache

6. Open a new terminal in ubuntu

7. start ganache by using the following
```
ganache-cli --deterministic
```
By default ganache generates 10 accounts with 100 ETH for each account. Copy the first and second entry  from Private Keys section.
Open the browser and install metamask plugins, from networks select "Private Network" and configure it to talk to ganache at 8545, once connected add ganache accounts by importing the private keys from ganache console and rename the first account as "Dealer" and second account as "User". Mark the "dealer" account as the default metamask wallet account.

8. Open the Bi(e)tCoin root folder 
run the fllowing commands to compile and deploy the required smart contracts to ganache
```
truffle compile
truffle migrate --network=ganache --reset
```
The above process initiate the Bi(e)Coin network  using ganache
9. change directory to bitcoin
10. deploy the dApp using the following command
```
ng serve --port=5400 --open
```
This process will compile/build and deploy bi(e)tCoin Dapp to the localhost:5400


