const { expect } = require('chai');
const { ethers } = require('hardhat');
const { time } = require('@openzeppelin/test-helpers');

describe('StakingRewards', function() {
  let ponzu;
  let dummyToken;
  let rewardsPonzuPonzu;
  let rewardsPonzuETH;
  let signers;

  beforeEach(async () => {
    signers = await ethers.getSigners();

    const DummyToken = await ethers.getContractFactory("Ponzu"); 
    dummyToken = await DummyToken.deploy(signers[0].address);
    await dummyToken.deployed();

    const Ponzu = await ethers.getContractFactory('Ponzu');
    ponzu = await Ponzu.deploy(signers[0].address);
    await ponzu.deployed();

    const Rewards = await ethers.getContractFactory('NyanRewards');
    rewardsPonzuPonzu = await Rewards.deploy(ponzu.address, ponzu.address);
    await rewardsPonzuPonzu.deployed();

    rewardsPonzuETH = await Rewards.deploy(ponzu.address, ethers.constants.AddressZero);
    await rewardsPonzuETH.deployed();

    await ponzu.transfer(signers[1].address, ethers.utils.parseEther("10"));
  });

  it('It should allow people to claim rewards and original ponzu after staking ponzu', async function() {
    await ponzu.transfer(rewardsPonzuPonzu.address, ethers.utils.parseEther("10"));
    await rewardsPonzuPonzu.setRewardParams(ethers.utils.parseEther("10"), 86400);
    await ponzu.connect(signers[1]).approve(rewardsPonzuPonzu.address, ethers.utils.parseEther("10"));
    await rewardsPonzuPonzu.connect(signers[1]).stake(1000);
    expect(await rewardsPonzuPonzu.earned(signers[1].address)).to.equal(0);
    await time.increase(86400);
    expect(await rewardsPonzuPonzu.earned(signers[1].address)).to.equal("9999768518518454520");
    await rewardsPonzuPonzu.connect(signers[1]).exit()
    expect(await ponzu.balanceOf(signers[1].address)).to.equal(ethers.BigNumber.from("9999768518518454520").add(ethers.utils.parseEther("10")));
  });
  it('It should allow people to claim rewards and original eth after staking eth', async function() {
    await ponzu.transfer(rewardsPonzuETH.address, ethers.utils.parseEther("10"));
    await rewardsPonzuETH.setRewardParams(ethers.utils.parseEther("10"), 86400);
    await rewardsPonzuETH.connect(signers[1]).stake(0, { value: "1000"});
    expect(await rewardsPonzuETH.earned(signers[1].address)).to.equal(0);
    await time.increase(86400);
    expect(await rewardsPonzuETH.earned(signers[1].address)).to.equal("9999884259259195260");
    await rewardsPonzuETH.connect(signers[1]).exit()
    expect(await ponzu.balanceOf(signers[1].address)).to.equal(ethers.BigNumber.from("19999884259259195260"));
    expect(await ethers.provider.getBalance(signers[1].address)).to.equal("9999999576823000000000");
  });
});
