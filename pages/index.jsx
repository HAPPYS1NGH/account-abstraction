import { ethers } from "ethers";
import { useState } from "react";
import { Client, Presets } from "userop";
export default function Home() {
  let privateKeyAA;
  if (typeof window !== 'undefined') {
    privateKeyAA = localStorage.getItem('privateKeyAA');
    console.log("1st paa " + privateKeyAA);
    if (privateKeyAA == null) {
      privateKeyAA = new ethers.Wallet(ethers.utils.randomBytes(32)).privateKey;
      console.log("In if of 1st paa " + privateKeyAA);
    }
  }
  const [userAddress, setuserAddress] = useState("");
  const [privateKey, setPrivateKey] = useState(privateKeyAA);
  const [importedPrivateKey, setImportedPrivateKey] = useState();
  const [sendAddress, setSendAddress] = useState();
  const [amount, setAmount] = useState();
  const [balance, setBalance] = useState();
  const [fetch, setFetch] = useState(false);
  const [transfering, setTransfering] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  console.log("Private Key below state " + privateKey);

  const [config, setConfig] = useState({
    rpcUrl: `https://api.stackup.sh/v1/node/${process.env.API_KEY}`,
    signingKey: privateKey,
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    simpleAccountFactory: "0x9406Cc6185a346906296840746125a0E44976454",
    paymaster: {
      rpcUrl: "https://api.stackup.sh/v1/paymaster/API_KEY",
      context: {},
    },
  })

  async function createNewWallet() {
    console.log("Private Key at check " + privateKey);
    console.log("Private Key AA at check " + privateKeyAA);
    if (typeof window !== 'undefined') {
      let newPrivateKey = new ethers.Wallet(ethers.utils.randomBytes(32)).privateKey;
      localStorage.setItem('privateKeyAA', newPrivateKey);
      privateKeyAA = localStorage.getItem('privateKeyAA');
      console.log("Private Key updating" + privateKeyAA)
      setPrivateKey(privateKeyAA);
      console.log("Private Key after changing " + privateKey);
    }
  }

  async function address() {
    setFetch(true);
    localStorage.setItem("privateKeyAA", privateKey);
    const simpleAccount = await Presets.Builder.SimpleAccount.init(
      new ethers.Wallet(privateKey),
      config.rpcUrl,
      config.entryPoint,
      config.simpleAccountFactory
    );
    const address = simpleAccount.getSender();
    console.log(`SimpleAccount address: ${address}`);
    setuserAddress(address);
    setFetch(false);
  }

  async function balanceOfAddress() {
    setFetch(true);
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const alchemyApiKey = process.env.API_KEY;
    // const providerUrl = `https://eth-mumbai.alchemyapi.io/v2/${alchemyApiKey}`;
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    let bal = await provider.getBalance(userAddress);
    console.log(bal.toString());
    setBalance(ethers.utils.formatEther(bal.toString()));
    setFetch(false)
  }
  async function importUsingPrivateKey() {
    setFetch(true);
    localStorage.setItem("privateKeyAA", importedPrivateKey);
    const simpleAccount = await Presets.Builder.SimpleAccount.init(
      new ethers.Wallet(privateKey),
      config.rpcUrl,
      config.entryPoint,
      config.simpleAccountFactory
    );
    const address = simpleAccount.getSender();
    console.log(`SimpleAccount address: ${address}`);
    setuserAddress(address);
    setFetch(false);
  }

  async function transfer() {
    setTransfering(true)
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
    setTransfering(false)
  }

  function exportPrivateKey() {
    setIsToggled(prevToggle => !prevToggle)
    console.log(process.env.NEXT_PUBLIC_API_KEY)
  }



  return (
    <div className=" mx-auto m-10 p-20 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Create the Account Abstracted Wallet</h1>
      <div className="bg-gray-100 text-center py-10 rounded-lg mb-10 p-10">
        {!userAddress ?
          <button className="bg-blue-500 hover:bg-blue-600 my-10  text-white py-2 px-4 rounded-lg " onClick={address}>
            {fetch ? "Connecting..." : "Connect Wallet"}
          </button>
          :
          <>
            <div className=" flex justify-center items-center items">
              <h2 className="text-lg font-bold mx-10">Address is <i className=" text-xl ml-5">{userAddress}</i></h2>
              <button className="bg-green-500 hover:bg-green-600 ml-auto m-5 text-white py-2 px-4 rounded-lg mb-4" onClick={address} > Connected / Update
              </button>
            </div>
            {balance ?
              <div className=" flex justify-center items-center items">
                <h2 className="text-lg font-bold mx-10">Balance is <i className=" text-xl ml-5">{balance} Ether</i></h2>
                <button className="bg-green-500 hover:bg-green-600 ml-auto m-5 text-white py-2 px-4 rounded-lg mb-4" onClick={balanceOfAddress}>{fetch ? "Fetching..." : "New Balance"}
                </button>
              </div>
              :
              <button className=" bg-blue-500 hover:bg-blue-600 my-5 text-white py-2 px-4 rounded-lg " onClick={balanceOfAddress}>{fetch ? "Fetching..." : "Get Balance"}</button>
            }
          </>
        }
      </div>
      {userAddress &&
        <>
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
              {transfering ? "Transacting..." : "Send Transaction"}
            </button>
          </div>
        </>
      }
      <button className="bg-blue-500 mx-10 my-5 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={createNewWallet}>Create New Wallet
      </button>
      <div>
        <button className="bg-blue-500 mx-10 my-5 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={exportPrivateKey}>Export Private Key
        </button>
        {isToggled && <h1 >{privateKey}</h1>}
      </div>
    </div>
  );
}

