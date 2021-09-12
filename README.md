# Ponzu Club
Support projects on Arbitrum to earn ponzus.

# Addresses
**Governance Contracts**
```
Ponzu deployed to:  0x7d2D35cF256cb47b8cAa6eB4d793f1c7e2228d35
Timelock deployed to: 0x1A5c344DB58b3d9094a1761272a27C08ba411eDa
Delegate deployed to: 0xd4722a14d0B73edB948E9c96Fa9278d8d870C673
Delegator deployed to: 0x0ff9eAb68d3A17258D90796d2B328008E7ac3587
```


**Reward Pools**
```
RewardsPonzuPonzu deployed to:  0xF6a37745FC911666132E8b8F29fC9c4F5C4a703D
RewardsPonzuETH deployed to:  0x245E2775446684F50D22D11A7F4f63502a1B0c8C
RewardsPonzuSLP(PONZU/ETH) deployed to: 0x01B5e2A392Da78C8D42644272C4b7Adbfb84230B
RewardsPonzuSLP(PONZU/CARBON) deployed to: 0x516BEB71135EaE2AE0D627DfB05eEf93E637d3EB
RewardsPonzuSLP(PONZU/NYAN) deployed to: 0xd0d65a2250fc427a1021E938B39Ba73B3d7e5CC2
```

# Token Distribution 
7% reserved for dev and early contributors (700,000)
4% in ETH pool, for 1 week (400,000)
8% in PONZU pool, for 2 months (800,000)
13% in PONZU/ETH pool, for 2 months (1,300,000)
9% in PONZU/NYAN pool, for 2 months (900,000)
9% in PONZU/CARBON pool, for 2 months (900,000)
50% locked in timelock for future deployments (5,000,000)

# Advanced Sample Hardhat Project

This project demonstrates an advanced Hardhat use case, integrating other tools commonly used alongside Hardhat in the ecosystem.

The project comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts. It also comes with a variety of other tools, preconfigured to work with the project code.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
npx hardhat help
REPORT_GAS=true npx hardhat test
npx hardhat coverage
npx hardhat run scripts/deploy.js
node scripts/deploy.js
npx eslint '**/*.js'
npx eslint '**/*.js' --fix
npx prettier '**/*.{json,sol,md}' --check
npx prettier '**/*.{json,sol,md}' --write
npx solhint 'contracts/**/*.sol'
npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

To try out Etherscan verification, you first need to deploy a contract to an Ethereum network that's supported by Etherscan, such as Ropsten.

In this project, copy the .env.template file to a file named .env, and then edit it to fill in the details. Enter your Etherscan API key, your Ropsten node URL (eg from Alchemy), and the private key of the account which will send the deployment transaction. With a valid .env file in place, first deploy your contract:

```shell
hardhat run --network ropsten scripts/deploy.js
```

Then, copy the deployment address and paste it in to replace `DEPLOYED_CONTRACT_ADDRESS` in this command:

```shell
npx hardhat verify --network ropsten DEPLOYED_CONTRACT_ADDRESS "Hello, Hardhat!"
```
