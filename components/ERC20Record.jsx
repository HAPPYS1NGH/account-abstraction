import React, { useContext, useState, useEffect } from 'react'
import AccountInfo from './contexts/AccountInfo';
import { ERC20_ABI } from '@/public/utils/abi';
import { ethers } from 'ethers';
import Image from 'next/image';
import Link from 'next/link';

function ERC20Record({ config }) {
    const [info, setInfo] = useState({});
    const [refresh, setRefresh] = useState(false)
    const [tokenAddress, setTokenAddress] = useState('0x0FA8781a83E46826621b3BC094Ea2A0212e71B23');
    const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
    const address = useContext(AccountInfo);

    async function getTokenBalances() {
        console.log("HEELLlllllo");
        console.log(info);
        setRefresh(true)
        try {
            const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
            const balances = await tokenContract.balanceOf(address);
            const [symbol, decimals] = await Promise.all([
                tokenContract.symbol(),
                tokenContract.decimals(),
            ]);
            const balanceOf = balances.toString()
            setInfo({ balanceOf, symbol, decimals })
            console.log({ balanceOf, symbol, decimals });
        } catch (error) {
            console.log(error);

        }
        finally {
            setRefresh(false)
        }
    }

    useEffect(() => {
        getTokenBalances()
    }, [address])


    return (
        <div className='mb-10'>
            <div className='flex'>
                <h1 className='text-xl font-semibold '> ERC 20 Tokens</h1>
                {/* <button onClick={getTokenBalances} className='ml-auto'>Refresh</button> */}
                <button className='ml-auto p-2 ' onClick={getTokenBalances}>
                    <Image src="/images/refresh.png" alt="refresh" height={20} width={20} className={refresh ? `animate-spin` : ""} />
                </button>
            </div>
            {
                info.balanceOf != null
                    &&
                    info.balanceOf != 0
                    ?

                    <div className='flex gap-6 my-4 bg-slate-300 rounded-lg p-4'>
                        <Link href="https://mumbai.polygonscan.com/token/0x0fa8781a83e46826621b3bc094ea2a0212e71b23" className='hover:underline'>{info.symbol}</Link>
                        <h1>{info.balanceOf}</h1>
                        <h1 className='ml-auto'>Decimals -{info.decimals}</h1>
                    </div>
                    :
                    <div className='m-2'>
                        No tokens
                    </div>
            }
        </div>
    )
}

export default ERC20Record