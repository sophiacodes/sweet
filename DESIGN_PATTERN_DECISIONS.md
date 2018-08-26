# Solidity Design Patterns

## Behavioral Patterns

### State Machine

Function modifiers were used to model the states and guard against incorrect usage of the contract. The next setion below provides an example of it's usage in the Marketplace contract.

### Modifiers

The [Solidity documentation](https://solidity.readthedocs.io/en/v0.4.24/) suggests that `require()` "should be used to ensure valid conditions, such as inputs, or contract state variables [..], or to validate return values from calls to external contracts" evaluating the parameters passed to it as a boolean and throw an exception if it evaluates to false. The `revert()` throws in every case.

```Solidity
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
```

## Security Patterns

### Access Restriction

State variables used were `public` which allowed methods and variables to be accessed from the contract. The use of `modifiers` discussed below, which used to provide a layer of security to the public functions.

```Solidity 
function approveApplication(address _storeOwner) public onlyOwner {
    store[_storeOwner].approved = true;
    store[_storeOwner].timestamp = now;
}
```

A `private` mapping of the user balances also features in the contract. 

```Solidity 
mapping (address => uint) private sellerBalances;
```

### Emergency Kill

Contract self destruction is used for terminating a contract, which means removing it forever from the blockchain. Once destroyed, it’s not possible to invoke functions on the contract and no transactions will be logged in the ledger. 

```Solidity
function kill() public onlyOwner {
    selfdestruct(admin);
}
```

### Secure Withdrawal 

An overview over the differences of the three methods is given in the following table:

| Function       | Amount of Gas Forwarded | Exception Propagation  |
| :------------- |-------------:| -----:|
| send      | 2300 (not adjustable) | `false`on failure |
| call.value      | all remaining gas (adjustable)      |   `false`on failure |
| transfer | 2300 (not adjustable)      |    throws on failure |

The Marketplace smart contract used the `.transfer()` method to execute secure transactions, which was chosen because of it's build-in security features of reverting failed transactions and throwing exceptions on failure.

```Solidity
contract Marketplace {

    function () public payable {}

    ...

    function withdrawBalance() public {
        uint amountToWithdraw = sellerBalances[msg.sender];
        sellerBalances[msg.sender] = 0;
        // The user's balance is already 0, so future invocations won't withdraw anything
        msg.sender.transfer(amountToWithdraw);
    }
}
```