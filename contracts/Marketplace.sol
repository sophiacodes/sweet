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
        uint storeId;
        uint timestamp;
    }

    struct Asset {
        address storeOwner; // Seller
        address contractAddress; // Contract where the asset exists
        string name;
        string descriptionHash; // IPFS description hash location
        // string imageHash; // TODO: IPFS image hash location
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
    mapping (address => uint) private sellerBalances;

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
            store[storeOwner] = Store(storeOwner, _name, false, storeIdCounter, 0);
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
      * @param _descriptionHash Description hash of the asset.
      * @param _price Price of the asset.
      * @return bool Returns the status of the asset created.
      */
    function createAsset(string _name, address _contractAddressOfAsset, string _descriptionHash, uint _price) payable public returns (bool) {
        bool createdAsset = false;

        if (store[msg.sender].owner == msg.sender && store[msg.sender].approved == true) {
            asset[assetIdCounter] = Asset(msg.sender, _contractAddressOfAsset, _name, _descriptionHash, _price, assetIdCounter, 0x0000000000000000000000000000000000000000, false);
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
      * @param _descriptionHash An update of the description of the asset.
      * @param _price An update of the price of the asset.
      * @param _assetId Id of the asset that will be updated.
      * @return bool Returns status of updated asset.
      */
    function updateAsset(string _name, string _descriptionHash, uint _price, uint _assetId) public returns (bool) {
        bool assetUpdated = false;
        
        if (store[msg.sender].owner == msg.sender && asset[_assetId].storeOwner == msg.sender) {
            asset[_assetId].name = _name;
            asset[_assetId].descriptionHash = _descriptionHash;
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

     /** @dev Retrieves the balance for the sellers account.
      * @return uint Returns balance.
      */
    function getSellerBalance() public view returns (uint) {
        return sellerBalances[msg.sender];
    }

    function buyAsset(address _seller, uint _assetId) onlyBuyer(_assetId) public payable returns (bool) {
        require(_assetId >= 0 && _assetId <= assetIdCounter); // Asset should exist 

        if(!setOwner(_assetId, msg.sender)) {
            revert();
        } // Set the assets new owner

        if (msg.value > 0) {
            // Add amount to mapping seller account balance
            sellerBalances[_seller] += msg.value; 
            // Update details of the asset sold
            asset[_assetId].sold = true;
            asset[_assetId].buyer = msg.sender;
            return true;
        } else {
            return false;
        }
    }

    /** @dev Only seller can withdraw own funds. All funds mapped to address will be released 
      */
    function withdrawBalance() public {
        uint amountToWithdraw = sellerBalances[msg.sender];
        sellerBalances[msg.sender] = 0;
        // The user's balance is already 0, so future invocations won't withdraw anything
        msg.sender.transfer(amountToWithdraw);
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