var Marketplace = artifacts.require("./Marketplace.sol");

contract('Marketplace', function(accounts) {

    // Ensures that the owner of the deployed contract is the owner/admin of the marketplace instance.
    it("...deployed contract owner should be admin", function() {
        return Marketplace.deployed().then(function(instance) {
            marketplaceInstance = instance;
        }).then(function() {
            return marketplaceInstance.admin.call();
        }).then(function(output) {
            assert.equal(output, accounts[0], "accounts[0] should be admin, contract owner");
        });
    });

    // Ensures that a stored can be created by an account other than the owner, as defined in the smart
    // contract. 
    it("...should create new store", function() {
        return Marketplace.deployed().then(function(instance) {
            marketplaceInstance = instance;
            return marketplaceInstance.createStore('Store Name', {from: accounts[1]});
        }).then(function() {
            return marketplaceInstance.storeIdCounter.call();
        }).then(function(output) {
            assert.equal(output, 1, "There should be 1 store created");
        });
    });

    // Ensures that all stores created are retreived when requested. 
    it("...should get all stores", function() {
        return Marketplace.deployed().then(function(instance) {
            marketplaceInstance = instance;
        }).then(function() {
            return marketplaceInstance.getAllStores.call();
        }).then(function(output) {
            assert.equal(output, accounts[1], "Should get store address of store created");
            assert.equal(output.length, 1, "1 store address should have been retreived");
        });
    });

    // Ensures that the contract balance is returned when requested. 
    it("...should get contract balance", function() {
        return Marketplace.deployed().then(function(instance) {
            marketplaceInstance = instance;
        }).then(function() {
            return marketplaceInstance.getBalance.call();
        }).then(function(output) {
            assert.equal(parseInt(output.toString()), 0, "There should be no funds in contract address");
        });
    });

    // Ensures that an asset cannot be created with having first been approved by the admin,  
    // as defined in the smart contract.
    it("...should not be able to create asset without store being approved", function() {
        return Marketplace.deployed().then(function(instance) {
            marketplaceInstance = instance;
            return marketplaceInstance.createAsset('Asset Name', 0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB, 'Asset Decription', 50, {from: accounts[1]});
        }).then(function() {
            return marketplaceInstance.assetIdCounter.call();
        }).then(function(output) {
            assert.equal(output, 0, "Asset counter should be zero");
        });
    });
});