// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const Ponzu = await hre.ethers.getContractFactory("Ponzu");
  const ponzu = await Ponzu.attach("0x7d2D35cF256cb47b8cAa6eB4d793f1c7e2228d35");
  console.log("Ponzu deployed to: ", ponzu.address);

  const Rewards = await hre.ethers.getContractFactory("NyanRewards");
  rewardsPonzuPonzu = await Rewards.deploy(ponzu.address, ponzu.address);
  await rewardsPonzuPonzu.deployed();
  console.log("RewardsPonzuPonzu deployed to: ", rewardsPonzuPonzu.address);

  rewardsPonzuETH = await Rewards.deploy(ponzu.address, hre.ethers.constants.AddressZero);
  await rewardsPonzuETH.deployed();
  console.log("RewardsPonzuETH deployed to: ", rewardsPonzuETH.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
