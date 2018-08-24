pragma solidity ^0.4.24;

/** @title LibraryDemo */
library LibraryDemo { 

    struct Asset { mapping(uint => bool) flags; }

    /** @dev Ensures the asset contract address doesn't exist before adding.
      * @param _assetId Id of the asset to add.
      * @return bool Returns the status of asset addition.
      */
    function add(Asset storage self, uint _assetId) public returns (bool) {
        if (self.flags[_assetId])
            return false; // Already exists
        self.flags[_assetId] = true;
        return true;
    }
}