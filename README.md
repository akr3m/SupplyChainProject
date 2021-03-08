# Supply Chain Project

Project reflects a sample implementation demonstrating basic functionality of a coffee supply chain system, tracking the coffee item from Farmer to Consumer.  I leveraged the boilerplate code from the Udacity team to implement the functionality. Item state is tracked throughout the system to ensure the proper flow of the coffee item. 


# Flow

The flow of the supply chain system is as follows:

- An owner creates a contract instance
- Owner adds a farmer 
    - Owner is assumed to be the farmer in this instance
- Farmer harvests the coffee
    - Harvested end state, a pre-condition for the next step
- Farmer then process the coffee
	- Processed end state, a pre-condition for the next step
- Afterwards, Farmer packs the coffee
	- Packed end state
- Finally, the farmer puts the coffee up for sale
	- For Sale end state
- Distributor pays the farmer to get the coffee
	- Owner account adds the distributor
	- Owner transfers the ownership to the distributor
	- Distributor then pays the farmer and buys the coffee
	- End state is Sold
- Distributor ships the coffee
	- End state is Shipped
- Retailer receives the coffee
	- Owner adds the retailer
	- Distributor then transfers the ownership to the retailer
	- Retailer then receives the coffee
	- End state is received
- Consumer purchases the coffee
	- Owner adds the consumer
	- Retailer then transfers the ownership to the consumer
	- Consumer then purchases the coffee
	- End state is Purchased

## Diagrams

A modified version of the provided sequence and state diagram is included in the folder **diagrams**

## Libraries Used
