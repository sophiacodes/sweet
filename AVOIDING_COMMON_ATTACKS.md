# Avoiding Common Attacks

## Logic Bugs, Recursive Calls & Reentrancy

Unit tests were created to test the behaviour of the contract behaves is as expected. Run `truffle test`. Solidity coding standards and best practices were taken into consideration during the implementation of the Marketplace contract, using the Solidity documentation extensively for guidance.

External function calls were safe guided by the use of `modifier`, `require()` to test conditions and throw exceptions and `revert()` to protect against unexpected behaviour and recursive calls.  

## Tx.origin & Gas Limits

`tx.origin` is not required as Ethereum core developers have stated publicly that it is not meaningful and unlikely to be usable. So `msg.sender` the recommended syntax has been used in the Marketplace contract to refer to the sender of the function calls.

Care of looping over arrays in the contract of undetermined length has been considered. Due to the complexity and gas limit issues, storage is returned to the Dapp and dealt with on the client-side. 

The length of user data supplied is controlled via the client-side, such an example of a case where this applies in the Dapp is in the profile 'My Account' page where the user can create a new asset to list for sell and adds the title and description information of the asset. 