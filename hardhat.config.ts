import {task} from "hardhat/config";
// @ts-ignore
import { accounts } from './test-wallets';

require('dotenv').config();

import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import 'hardhat-gas-reporter';

const ALCHEMY_KEY=process.env.ALCHEMY_KEY||'';
const FORK_BLOCK_NUMBER=process.env.FORK_BLOCK_NUMBER||'';


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      forking: {
        url:`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_KEY}`,
        blockNumber: Number.parseInt(FORK_BLOCK_NUMBER)
      },
      accounts: accounts.map(({ secretKey, balance }: { secretKey: string; balance: string }) => ({
        privateKey: secretKey,
        balance,
      })),
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
};
