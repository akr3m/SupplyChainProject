# Supply Chain Project

Project reflects a sample implementation demonstrating basic functionality of a coffee supply chain system, tracking the coffee item from Farmer to Consumer.  I leveraged the boilerplate code from the Udacity team to implement the functionality. Item state is tracked throughout the system to ensure the proper flow of the coffee item. 


# Flow

The flow of the supply chain system is as follows:

- An owner creates a contract instance
- Owner has the option to add a farmer 
- Farmer harvests the coffee (Owner is also able to harvest)
    - Harvested end state, a pre-condition for the next step
- Farmer then process the coffee (Owner is also able to process)
	- Processed end state, a pre-condition for the next step
- Afterwards, Farmer packs the coffee (Owner is also able to pack)
	- Packed end state
- Finally, the farmer puts the coffee up for sale (Owner is also able to do this action)
	- For Sale end state
- Distributor pays the farmer to get the coffee (Owner is also able to do this action)
	- Owner account can add a distributor, but that would require a change in account in Metamask
	- Distributor then pays the farmer and buys the coffee
	- End state is Sold
- Distributor ships the coffee (Owner is also able to do this action)
	- End state is Shipped
- Retailer receives the coffee (Owner is also able to do this action)
	- Owner can add a retailer
	- Retailer then receives the coffee
	- End state is received
- Consumer purchases the coffee (Owner is also able to do this action)
	- Owner can add a consumer
	- Consumer then purchases the coffee
	- End state is Purchased

## Diagrams

A modified version of the provided sequence and state diagram is included in the folder **diagrams**

## Libraries and System Versions Used
The only incremental install from the boiler plate code was for the correct version of the web3.min.js and truffle HD Wallet provider.  Respective versions and used libraries are listed below.  Note that this is not the exhaustive list, but reflects the essentials needed to build the project:

- web3.min.js: 0.20.6
- truffle-contract.js: 0.0.5
- @truffle/hdwallet-provider: ^1.2.2
- lite-server: ^2.6.1
- solidity compiler: ^0.4.23
- node: 14.6.0
- npm: 6.14.11
- truffle: 5.2.3


# Deployment Info - Rinkeby Test Net
Rinkeby etherscan url for reference below
- Supply Chain: https://rinkeby.etherscan.io/address/0xe5DEbD43bdB60b5231255D4e3583Ce34b44b3FC9
- Farmer Role: https://rinkeby.etherscan.io/address/0x7d9e5570177770cd3139fa4cfd038476f2eb854e
- Consumer Role: https://rinkeby.etherscan.io/address/0xbeaeecd0f65f41620dc16e950e939099aec5cabe
- Distributor Role: https://rinkeby.etherscan.io/address/0x2481f465584f88fcd74eb104b97c63b084932109
- Retailer Role: https://rinkeby.etherscan.io/address/0xbeaeecd0f65f41620dc16e950e939099aec5cabe



Separately, detailed log of the migration and contract addresses can be found in the file ./migration-details.txt
