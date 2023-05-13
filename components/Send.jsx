import React from 'react'
import { ethers } from "ethers";
import { useState } from "react";
import { Client, Presets } from "userop";
function Send({ config, balance }) {

    const [sendAddress, setSendAddress] = useState();
    const [amount, setAmount] = useState();
    const [transferFunds, setTransferFunds] = useState(false);
    const [popUp, setPopUp] = useState(false);
    function togglePopUp() {
        setPopUp(prev => !prev)
    }
    async function transfer() {
        setTransferFunds(true)
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
        setTransferFunds(false)
    }
    return (
        <div className=''>
            {
                !popUp ?
                    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg' onClick={togglePopUp}>Send</button>
                    :
                    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg' >Verify..</button>
            }
            {
                popUp &&
                <div className='fixed top-0 left-0  bg-white rounded-lg shadow-lg p-4 w-full h-full justify-center'>
                    <div className='flex'>
                        <h2 className="text-2xl font-bold mb-4">Send your Funds</h2>
                        <button className='ml-auto' onClick={togglePopUp}>Close</button>
                    </div>

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
                        <h2>Your current balance is {balance}</h2>
                        <button className="bg-blue-500 mx-10 my-5 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={transfer}>
                            {transferFunds ? "Transacting..." : "Send Transaction"}
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Send