const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();

  const Ponzu = await ethers.getContractFactory('Ponzu');
  ponzu = await Ponzu.attach("0x7d2D35cF256cb47b8cAa6eB4d793f1c7e2228d35");
  await ponzu.deployed();
  console.log("Ponzu address: ", ponzu.address);

  // Predetermine GovernorBravoDelegator address
  const Delegate = await ethers.getContractFactory("GovernorBravoDelegate");
  delegate = await Delegate.attach("0xd4722a14d0B73edB948E9c96Fa9278d8d870C673");
  await delegate.deployed();
  console.log("Delegate address: ", delegate.address);

  const Delegator = await ethers.getContractFactory("GovernorBravoDelegator");
  delegator = await Delegator.attach("0x0ff9eAb68d3A17258D90796d2B328008E7ac3587");
  await delegator.deployed();
  console.log("Delegator address: ", delegator.address);

  await proxy.connect(owner).propose(
    [
      "0x516BEB71135EaE2AE0D627DfB05eEf93E637d3EB",  //RewardsPonzuSLP(PONZU/CARBON)
      "0xd0d65a2250fc427a1021E938B39Ba73B3d7e5CC2",  //RewardsPonzuSLP(PONZU/NYAN)
    ],
    [ethers.utils.parseEther("0"),ethers.utils.parseEther("0")],
    [ethers.utils.parseEther("0"),ethers.utils.parseEther("0")],
    ["withdrawReward()", "withdrawReward()"],
    ["", ""],
    "Withdraw staking rewards from PONZU/CARBON pool and PONZU/NYAN pool"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });