App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID, 
            App.consumerID
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
            console.log('used window.ethereum');
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
            console.log('used window.web3');
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            //App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
            App.web3Provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/ac581050214241a2bd7b9bd0b504597d');
            console.log('connected via localhost:8545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            //App.fetchItemBufferOne();
            //App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 0:
                return await App.addFarmerId(event);
                break;
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.addDistributor(event);
                break;
            case 6:
                return await App.buyItem(event);
                break;
            case 7:
                return await App.shipItem(event);
                break;
            case 8:
                return await App.addRetailer(event);
                break;
            case 9:
                return await App.transferOwnershipToRetailer(event);
                break;
            case 10:
                return await App.receiveItem(event);
                break;
            case 11:
                return await App.addConsumer(event);
                break;
            case 12:
                return await App.transferOwnershipToConsumer(event);
                break;
            case 13:
                return await App.purchaseItem(event);
                break;
            case 14:
                return await App.fetchItemBufferOne(event);
                break;
            case 15:
                return await App.fetchItemBufferTwo(event);
                break;
            case 16:
                return await App.resetOwnership(event);
                break;
            }
    },

    addFarmerId: async function(event) {
        event.preventDefault();
        var farmerId = $("#originFarmerID").val();
        console.log('Inside Add Farmer ID');
        App.contracts.SupplyChain.deployed().then(async function(instance) {
            await instance.addFarmer(farmerId, {from: App.metamaskAccountID});
            console.log("Farmer has been added");
        });
    },

    harvestItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        var farmerId = $("#originFarmerID").val();
        var supplyChainInstance;
        console.log('Inside Harvest Item event handler');
        App.contracts.SupplyChain.deployed().then(async function(instance) {
            return instance.harvestItem(
                App.upc, 
                farmerId, 
                App.originFarmName, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes,
                { from: App.metamaskAccountID }
            );
        }).then(function(result) {
            console.log('harvestItem',result);
            $("#ftc-item").text(result);
            $("#ftc-events").append('<li>' + result.logs[0].event + ' - ' + result.logs[0].transactionHash + '</li>');
        }).catch(function(err) {
            console.log(err);
        });
    },

    processItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('processItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const productPrice = web3.toWei(1, "ether");
            console.log('productPrice',productPrice);
            return instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sellItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addDistributor: function(event) {
        event.preventDefault();
        var currentDistributorId = $("#distributorID").val();
        console.log('Inside Add Distributor ID');
        App.contracts.SupplyChain.deployed().then(async function(instance) {
            console.log('inside the if conditional');
            await instance.addDistributor(currentDistributorId, {from: App.metamaskAccountID});
            await instance.transferOwnership(currentDistributorId, {from: App.metamaskAccountID});
            console.log("Distributor added and is the current owner");
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(1, "ether");
            return instance.buyItem(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('shipItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addRetailer: function(event) {
        event.preventDefault();
        console.log('Inside Add Retailer ID');
        App.contracts.SupplyChain.deployed().then(async function(instance) {
        await instance.addRetailer(App.retailerID, {from: App.ownerID});
        console.log("Retailer added");
        });
    },

    transferOwnershipToRetailer: function(event) {
        event.preventDefault();
        console.log('Inside Transfer Ownership to Retailer ');
        App.contracts.SupplyChain.deployed().then(async function(instance) {
        await instance.transferOwnership(App.retailerID, {from: App.distributorID});
        console.log("Retailer is the current owner");
        });
    },

    receiveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.upc, {from: App.retailerID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('receiveItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addConsumer: function(event) {
        event.preventDefault();
        console.log('Inside Add Consumer ID');
        App.contracts.SupplyChain.deployed().then(async function(instance) {
        await instance.addConsumer(App.consumerID, {from: App.ownerID});
        console.log("Consumer added");
        });
    },

    transferOwnershipToConsumer: function(event) {
        event.preventDefault();
        console.log('Inside Transfer Ownership to Consumer ');
        App.contracts.SupplyChain.deployed().then(async function(instance) {
        await instance.transferOwnership(App.consumerID, {from: App.retailerID});
        console.log("Consumer is the current owner");
        });
    },

    purchaseItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseItem(App.upc, {from: App.consumerID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('purchaseItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
        
          console.log('error',err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    },

    resetOwnership: function(event) {
        event.preventDefault();
        console.log('Inside Reset Ownership');
        App.contracts.SupplyChain.deployed().then(async function(instance) {
            var currentOwner = await instance.owner();
            var contractOwnerId = App.ownerID;
            if (currentOwner.toLowerCase() !== contractOwnerId.toLowerCase()) {
                await instance.transferOwnership(App.ownerID, {from: App.consumerID});
            }
            console.log('currentOwner', currentOwner);
        
        console.log("Ownership reset");
        });
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
