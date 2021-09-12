// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const Ponzu = await hre.ethers.getContractFactory("Ponzu");
  const ponzu = await Ponzu.deploy(owner.address);
  await ponzu.deployed();
  console.log("Ponzu deployed to: ", ponzu.address);

  // Predetermine GovernorBravoDelegator address
  let nonce = await owner.getTransactionCount();
  let adminAddress = hre.ethers.utils.getContractAddress({
    from: owner.address,
    nonce: nonce + 2
  })
  console.log("Delegator Address: ", adminAddress);

  const Timelock = await hre.ethers.getContractFactory("Timelock");
  timelock = await Timelock.deploy(
    adminAddress,
    172800 // 2 days
  );
  await timelock.deployed();
  console.log("Timelock deployed to:", timelock.address);

  const Delegate = await hre.ethers.getContractFactory("GovernorBravoDelegate");
  delegate = await Delegate.deploy();
  await delegate.deployed();
  console.log("Delegate deployed to:", delegate.address);

  const Delegator = await hre.ethers.getContractFactory("GovernorBravoDelegator");
  delegator = await Delegator.deploy(
    timelock.address,
    ponzu.address,
    owner.address,
    delegate.address,
    43200, // min voting period, in terms of number of blocks, this is around 6 hours
    1,  // min voting delay, in terms of number of blocks, this is around 0.4-0.5 seconds
    hre.ethers.utils.parseEther("100000"),  // 100,000 ponzu 1% proposal threshold
  );
  await delegator.deployed();  
  console.log("Delegator deployed to:", delegator.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
