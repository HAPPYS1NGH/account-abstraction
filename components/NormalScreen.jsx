import Account from "@/components/Account";
import FirstScreen from "@/components/FirstScreen";
import Header from "@/components/Header";
import Receive from "@/components/Receive";
import Send from "@/components/Send";
import { ethers } from "ethers";
import { useEffect, useState, useRef } from "react";
import { Client, Presets } from "userop";

export default function NormalScreen() {
    let privateKeyAA;
    let isFirstVisit
    if (typeof window !== 'undefined') {
        isFirstVisit = localStorage.getItem('firstVisit') === null;
    }

    const [userAddress, setuserAddress] = useState("");
    const [privateKey, setPrivateKey] = useState();
    const [sendAddress, setSendAddress] = useState();
    const [amount, setAmount] = useState();
    const [balance, setBalance] = useState();
    const [fetch, setFetch] = useState(false);
    const [config, setConfig] = useState({
        rpcUrl: `https://api.stackup.sh/v1/node/${process.env.NEXT_PUBLIC_API_KEY}`,
        signingKey: privateKey,
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        simpleAccountFactory: "0x9406Cc6185a346906296840746125a0E44976454",
        paymaster: {
            rpcUrl: "https://api.stackup.sh/v1/paymaster/API_KEY",
            context: {},
        },
    })

    async function init() {
        if (typeof window !== 'undefined') {
            privateKeyAA = localStorage.getItem('privateKeyAA');

            if (privateKeyAA == undefined) {
                privateKeyAA = new ethers.Wallet(ethers.utils.randomBytes(32)).privateKey;
                localStorage.setItem('privateKeyAA', privateKeyAA);
                setPrivateKey(privateKeyAA);
                console.log("In if of 1st paa " + privateKeyAA);
            }
            console.log(privateKeyAA + "In init");
            setPrivateKey(privateKeyAA);
            console.log("Init P k " + privateKey);
            await address()
            await balanceOfAddress()
        }
    }
    // console.log("Private Key below state " + privateKey);



    async function address() {
        setFetch(true);
        // localStorage.setItem("privateKeyAA", privateKey);
        console.log(privateKey);
        try {
            const simpleAccount = await Presets.Builder.SimpleAccount.init(
                new ethers.Wallet(privateKey),
                config.rpcUrl,
                config.entryPoint,
                config.simpleAccountFactory
            );
            const address = simpleAccount.getSender();
            console.log(`SimpleAccount address: ${address}`);
            setuserAddress(address);
        } catch (error) {
            console.log(error)
        }
        finally {
            setFetch(false);
        }
    }

    async function balanceOfAddress() {
        setFetch(true);
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const alchemyApiKey = process.env.API_KEY;
        // const providerUrl = `https://eth-mumbai.alchemyapi.io/v2/${alchemyApiKey}`;
        const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
        try {
            let bal = await provider.getBalance(userAddress);
            console.log(bal.toString());
            setBalance(ethers.utils.formatEther(bal.toString()));
        } catch (error) {
            console.log(error)
        }
        finally {
            setFetch(false);
        }
    }
    // useEffect(() => {
    //     if (!isFirstVisit) {
    //         init()
    //     }
    // }, [userAddress, balance, privateKey])

    // useEffect(() => {
    //     if (!isFirstVisit) {
    //         setConfig(prevConfig => {
    //             return {
    //                 ...prevConfig,
    //                 signingKey: privateKey
    //             }
    //         })
    //     }
    // }, [privateKey])


    return (

        <div className="">
            {isFirstVisit ?
                <FirstScreen />
                :
                <div>
                    <button onClick={init}>click</button>
                    <p>{privateKey}</p>
                    <div className="mx-44 p-20 bg-gray-100 rounded-lg h-full">
                        <Header balance={balance} config={config} privateKey={privateKey} setPrivateKey={setPrivateKey} />
                        <Account balance={balance} address={userAddress} privateKey={privateKey} />
                        <div className="flex flex-wrap justify-center gap-14">
                            <Send balance={balance} sendAddress={sendAddress} amount={amount} config={config} />
                            <Receive />
                        </div>
                    </div>
                </div>
            }

        </div>

    );
}
