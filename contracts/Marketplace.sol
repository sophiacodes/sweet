pragma solidity ^0.4.24;

// Example of importing and using external contract
// import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

/** @title Marketplace */
contract Marketplace /* is Ownable */  {
    constructor() public {
    }

    function() public payable {
    }
    
    address public admin = msg.sender;
    uint public assetIdCounter;
    uint public storeIdCounter;
    address[] storeKeys;
    
    struct Store {
        address owner;
        string name;
        bool approved;
        uint balance;
        uint storeId;
        uint timestamp;
    }

    struct Asset {
        address storeOwner; // Seller
        address contractAddress; // Contract where the asset exists
        string name;
        string description;
        uint price;
        uint assetId;
        address buyer;
        bool sold;
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  Mappings                                                   *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  
    mapping (address => Store) public store; // Return details of a store
    mapping (uint => Asset) public asset; // Return details of an asset

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  Modifiers                                                  *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    
    modifier onlyOwner() {
        require(msg.sender == admin);
        _;
    }

    modifier onlySeller(uint _assetId) {
        if (asset[_assetId].storeOwner != msg.sender) revert();
        _;
    }
    
    modifier onlyBuyer(uint _assetId) {
        if (asset[_assetId].storeOwner == msg.sender) revert();
        _;
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  These functions perform transactions, editing the mappings *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    
    /** @dev Creates a store in the marketplace.
      * @param _name Name of the store.
      * @return bool Returns the status of store creation.
      */
    function createStore(string _name) public returns (bool) {
        bool createdStore = false;
        address storeOwner = msg.sender;
        if (store[storeOwner].owner != storeOwner) {
            // Create new Store Struct with name and saves it to storage.
            store[storeOwner] = Store(storeOwner, _name, false, 0, storeIdCounter, 0);
            storeKeys.push(storeOwner); // Keep track of store index to retrieve later
            storeIdCounter++;
            createdStore = true;          
        }
        return createdStore;
    }
    
    /** @dev Sets the bought asset contract address of the new owner.
      * @param _assetId ID of the asset bought.
      * @param _newOwner Address of the new owner.
      * @return bool Returns status of the operation.
      */
    function setOwner(uint _assetId, address _newOwner) public payable returns (bool) {
        bool success = false;
        if (asset[_assetId].storeOwner != _newOwner) { // Seller can't buy own asset
            asset[_assetId].contractAddress = _newOwner;
            success = true;
        }
        return success; 
    }

    /** @dev Gets all the stores in the marketplace.
      * @return address[] Returns an array of addresses of store owners.
      */
    function getAllStores() public view returns (address[]) {
        // Prepare intermediary array
        address[] memory storeAddresses = new address[](storeIdCounter);
    
        // Iterate over stores
        for (uint i = 0; i < storeIdCounter; i++) {
            if (storeKeys[i] != 0x0) {
                storeAddresses[i] = storeKeys[i];
            }
        }
        return storeAddresses;
    }
    
    /** @dev Creates an asset for a store, can only create asset if store exists and is approved 
      * @param _name Width of the rectangle.
      * @param _contractAddressOfAsset Height of the rectangle.
      * @param _desc Description of the asset.
      * @param _price Price of the asset.
      * @return bool Returns the status of the asset created.
      */
    function createAsset(string _name, address _contractAddressOfAsset, string _desc, uint _price) payable public returns (bool) {
        bool createdAsset = false;

        if (store[msg.sender].owner == msg.sender && store[msg.sender].approved == true) {
            asset[assetIdCounter] = Asset(msg.sender, _contractAddressOfAsset, _name, _desc, _price, assetIdCounter, 0x0000000000000000000000000000000000000000, false);
            assetIdCounter++;
            createdAsset = true;
        }
        return createdAsset;
    }
    
    /** @dev Deletes asset by resetting values to zero - default values
      * @param _assetId ID of the asset to be deleted.
      */
    function deleteAsset(uint _assetId) public onlySeller(_assetId) {
        delete asset[_assetId];
    }
    
    /** @dev Updates asset details, like name, description and price only
      * @param _name An update of the name of the asset.
      * @param _desc An update of the description of the asset.
      * @param _price An update of the price of the asset.
      * @param _assetId Id of the asset that will be updated.
      * @return bool Returns status of updated asset.
      */
    function updateAsset(string _name, string _desc, uint _price, uint _assetId) public returns (bool) {
        bool assetUpdated = false;
        
        if (store[msg.sender].owner == msg.sender && asset[_assetId].storeOwner == msg.sender) {
            asset[_assetId].name = _name;
            asset[_assetId].description = _desc;
            asset[_assetId].price = _price;
            assetUpdated = true;
        }
        return assetUpdated;
    }
    
    /** @dev Retrieves the balance for the msg.sender account.
      * @return uint Returns balance.
      */
    function getSenderBalance() public view returns (uint) {
        return msg.sender.balance;
    }
    
    /** @dev Allows a buyer to buy an asset, owner cannot buy own asset
      * @param _assetId Id of the asset to be bought.
      * @param _buyerAddress The address of the buyer buying the asset.
      */
    function buyAsset(uint _assetId, address _buyerAddress) onlyBuyer(_assetId) public payable {
        require(_assetId >= 0 && _assetId <= assetIdCounter); // Asset should exist 

        if(!setOwner(_assetId, _buyerAddress)) {
            revert();
        } // Set the assets new owner

        // Transfer funds
        // If move of funds successful... update ownership
        if (msg.sender.balance > asset[_assetId].price) {
            address(this).transfer(asset[_assetId].price);
            
            // Update balance of sellers store
            store[asset[_assetId].storeOwner].balance += asset[_assetId].price;
            
            // Update details of the asset sold
            asset[_assetId].sold = true;
            asset[_assetId].buyer = _buyerAddress;
        } else {
            // setOwner(_assetId, asset[_assetId].storeOwner);
            revert();
        }
    }

    /** @dev Transfers ether to receiver address.
      * @param _receiver An update of the name of the asset.
      * @param _amount An update of the description of the asset.
      */
    function withdrawFunds(address _receiver, uint256 _amount) public onlyOwner payable {
        // Check store balance is less than amount to be withdrawn
        // if (store[msg.sender].balance < _amount) {
        if (store[_receiver].balance < _amount) {
            return;
        }
        // Decrease stores balance
        // store[msg.sender].balance -= _amount;
        store[_receiver].balance -= _amount;
        
        // Withdraw amount from contract
        _receiver.transfer(_amount);
        // msg.sender.transfer(msg.value);
    }

    /** @dev Gets the contract account balance. Holds the proceeds of the assets bought in the marketplace.
      * @return uint256 Returns balance.
      */
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    /** @dev Allows contract owner (admin) to approve store applications
      * @param _storeOwner Address of the store owner.
      */
    function approveApplication(address _storeOwner) public onlyOwner {
        store[_storeOwner].approved = true;
        store[_storeOwner].timestamp = now;
    }

    /** @dev Destory contract.
      */
    function kill() public onlyOwner {
        selfdestruct(admin);
    }
}