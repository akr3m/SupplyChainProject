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

## Libraries Used
