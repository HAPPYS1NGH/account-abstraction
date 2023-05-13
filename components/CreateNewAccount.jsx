import React, { useState } from 'react'
import { ethers } from "ethers";

function CreateNewAccount({ toggleNewAccount, setPrivateKey, privateKey }) {
    const [created, setCreated] = useState(false)
    async function createNewWallet() {
        let privateKeyAA;
        console.log("Private Key at check " + privateKey);
        if (typeof window !== 'undefined') {
            let newPrivateKey = new ethers.Wallet(ethers.utils.randomBytes(32)).privateKey;
            localStorage.setItem('privateKeyAA', newPrivateKey);
            privateKeyAA = localStorage.getItem('privateKeyAA');
            console.log("Private Key updating" + privateKeyAA)
            setPrivateKey(privateKeyAA);
            setCreated(true)
            console.log("Private Key after changing " + privateKey);
        }
    }
    return (
        <div className='fixed top-0 left-0  bg-white rounded-lg shadow-lg p-4 w-full h-full justify-center'>
            <h1 className='text-2xl p-10 mt-20'>Do you really want to create a New Account?</h1>
            <div className='flex justify-center gap-4'>
                {created ?
                    <h1>Wallet Created Successfully</h1>
                    :
                    <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg' onClick={createNewWallet}>Create</button>
                }
                <button onClick={toggleNewAccount} className='bg-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-lg'>Take me Back</button>
            </div>
        </div>
    )
}

export default CreateNewAccount