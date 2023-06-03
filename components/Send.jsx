import React from 'react'
import { ethers } from "ethers";
import { useState, useContext } from "react";
import { Client, Presets } from "userop";
import AccountBalance from './contexts/AccountBalance';

function Send({ config, init }) {
    const balance = useContext(AccountBalance)
    const [sendAddress, setSendAddress] = useState();
    const [amount, setAmount] = useState();
    const [transferFunds, setTransferFunds] = useState(false);
    const [popUp, setPopUp] = useState(false);
    const [transactionHash, setTransactionHash] = useState()
    function togglePopUp() {
        setPopUp(prev => !prev)
        setTransactionHash();
    }
    async function transfer() {
        if (parseFloat(amount) > parseFloat(balance)) {
            alert("Not enough Funds")
        }
        else {
            setTransferFunds(true)
            try {
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
                setTransactionHash(ev.transactionHash);
                init()
            } catch (error) {
                console.log(error)
                alert("Maybe less Funds in Account")
            }
            finally {
                setTransferFunds(false)
            }
        }
    }
    return (
        <div className=''>
            {!popUp ? (
                <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg' onClick={togglePopUp}>Send</button>
            ) : (
                <div className='fixed top-0 lg:m-0  left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white w-full sm:max-w-md rounded-lg overflow-hidden shadow-xl lg:mx-0 mx-5'>
                        <div className='p-4'>
                            <div className='flex items-center justify-between'>
                                <h2 className='text-2xl font-bold mb-4'>Send your Funds</h2>
                                <button className='text-gray-500 hover:text-gray-800' onClick={togglePopUp}>
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                    </svg>
                                </button>
                            </div>
                            {transactionHash
                                ?
                                <div className="">
                                    <p className="font-semibold ">Transaction Hash:</p>
                                    <p className="break-all text-green-600">{transactionHash}</p>
                                    <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-3 inline-block">View on PolygonScan</a>
                                </div>
                                :
                                <form>
                                    <div className='mb-4'>
                                        <label className='block font-bold mb-2' htmlFor='send-address'>
                                            Address
                                        </label>
                                        <input
                                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                            id='send-address'
                                            type='text'
                                            name='sendAddress'
                                            value={sendAddress}
                                            onChange={(e) => setSendAddress(e.target.value)}
                                            placeholder='0x1234...'
                                        />
                                    </div>
                                    <div className='mb-4'>
                                        <label className='block font-bold mb-2' htmlFor='amount'>
                                            Amount
                                        </label>
                                        <input
                                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                            id='amount'
                                            type='text'
                                            name='amount'
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder='0.0'
                                        />
                                    </div>
                                    <div className='text-gray-500 text-sm mb-4'>Your current balance is {balance}</div>
                                    <button
                                        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full'
                                        onClick={transfer}
                                        disabled={transferFunds}
                                    >
                                        {transferFunds ? 'Transacting...' : 'Send Transaction'}
                                    </button>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Send