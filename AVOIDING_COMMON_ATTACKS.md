# Avoiding Common Attacks

## Logic Bugs & Recursive Calls

Unit tests were created to test the behavior of the contract is as expected. Run `truffle test`. Solidity coding standard and best practices were taken during the implementation of the Marketplace contract, using the Solidity documentation extensively for guidance.

External function calls are safe guided by the use of a `modifier`, `require()` to test conditions and throw exceptions and `revert()` to protect against unexpected behaviour. 

## Tx.origin & Gas Limits

`tx.origin` is not required as Ethereum community developers have stated that it is not meaningful and unlikely to be usable. So `msg.sender` the recommended syntax has been used in the Marketplace contract.

Care of looping over arrays in the contract of undetermined length has been considered. Due to the complexity and gas limit storage has been returned to the Dapp and dealt with on the client-side. 

The length of user data supplied is controlled via the client-side, such an example in a case where this applies is in the profile 'My Account' page where the user can create a new asset and adds the title and description information. 