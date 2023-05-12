import { ethers } from "ethers";
import config from "../config.json";
import { useState } from "react";
import { Client, Presets } from "userop";

export default function Home() {
  const [userAddress, setuserAddress] = useState("");
  const [sendAddress, setSendAddress] = useState();
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState();

  async function address() {
    const simpleAccount = await Presets.Builder.SimpleAccount.init(
      new ethers.Wallet(config.signingKey),
      config.rpcUrl,
      config.entryPoint,
      config.simpleAccountFactory
    );
    const address = simpleAccount.getSender();
    console.log(`SimpleAccount address: ${address}`);
    setuserAddress(address);
  }

  async function balanceOfAddress() {
    // const provider = new EtherscanProvider('polygon-mumbai');
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // let provider = ethers.getDefaultProvider(["mumbai",]);
    let bal = await provider.getBalance(userAddress);
    setBalance(bal.toString());
  }

  async function transfer() {
    let t = sendAddress;
    let amt = amount;
    let opts = "";
    const paymaster = opts.withPM
      ? Presets.Middleware.verifyingPaymaster(
        config.paymaster.rpcUrl,
        config.paymaster.context
      )
      : undefined;
    const simpleAccount = await Presets.Builder.SimpleAccount.init(
      new ethers.Wallet(config.signingKey),
      config.rpcUrl,
      config.entryPoint,
      config.simpleAccountFactory,
      paymaster
    );
    const client = await Client.init(config.rpcUrl, config.entryPoint);

    const target = ethers.utils.getAddress(t);
    const value = ethers.utils.parseEther(amt);
    const res = await client.sendUserOperation(
      simpleAccount.execute(target, value, "0x"),
      {
        dryRun: opts.dryRun,
        onBuild: (op) => console.log("Signed UserOperation:", op),
      }
    );
    console.log(`UserOpHash: ${res.userOpHash}`);

    console.log("Waiting for transaction...");
    const ev = await res.wait();
    console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
  }


  return (
    <div className=" mx-auto m-10 p-20 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create the Account Abstracted Wallet</h1>
      <div className="bg-gray-100 text-center py-10 rounded-lg mb-10 p-10">
        {!userAddress ?
          <button className="bg-blue-500 hover:bg-blue-600 my-10  text-white py-2 px-4 rounded-lg " onClick={address}> Connect Wallet
          </button>
          :
          <>
            <div className=" flex justify-center items-center items">
              <h2 className="text-lg font-bold mx-10">Address is <i className=" text-xl ml-5">{userAddress}</i></h2>
              <button className="bg-green-500 hover:bg-green-600 ml-auto m-5 text-white py-2 px-4 rounded-lg mb-4" disabled> Connected
              </button>
            </div>
            {balance ?
              <div className=" flex justify-center items-center items">
                <h2 className="text-lg font-bold mx-10">Balance is <i className=" text-xl ml-5">{balance}</i></h2>
                <button className="bg-green-500 hover:bg-green-600 ml-auto m-5 text-white py-2 px-4 rounded-lg mb-4" onClick={balanceOfAddress}>New Balance
                </button>
              </div>
              :
              <button className=" bg-blue-500 hover:bg-blue-600 my-5 text-white py-2 px-4 rounded-lg " onClick={balanceOfAddress}>Get Balance</button>
            }
          </>
        }
      </div>
      <h2 className="text-2xl font-bold mb-4">Transfer Funds with the Wallet</h2>
      <div className="bg-gray-100 p-10 py-10 rounded-lg mb-10">
        <form >
          <div className="mb-4 mx-10">
            <label className="block font-bold mb-2" htmlFor="send-address">
              Address
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              id="send-address"
              type="text"
              name="sendAddress"
              value={sendAddress}
              onChange={(e) => setSendAddress(e.target.value)}
              placeholder="0x1234..."
            />
          </div>
          <div className="mb-4 mx-10">
            <label className="block font-bold mb-2" htmlFor="amount">
              Amount
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              id="amount"
              type="text"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
            />
          </div>
        </form>
        <button className="bg-blue-500 mx-10 my-5 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={transfer}>
          Send Transaction
        </button>
      </div>
    </div>

  );
}

