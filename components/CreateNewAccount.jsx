import React, { useState } from 'react'
import { ethers } from "ethers";

function CreateNewAccount({ toggleNewAccount, setPrivateKey, privateKey, toggleDropdown }) {
    const [created, setCreated] = useState(false)
    async function createNewWallet() {
        let privateKeyAA;
        console.log("Private Key at check " + privateKey);
        if (typeof window !== 'undefined') {
            toggleDropdown()
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
        <div class="backdrop-filter backdrop-blur-sm fixed inset-0 z-50">
            <div className='fixed backdrop-filter backdrop-blur top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 max-w-md w-full sm:max-w-sm'>
                {created ? (
                    <div className='flex flex-col'>
                        <h1 className='text-xl font-bold mb-6'>Create New Wallet</h1>
                        <p className='text-green-500 font-bold mb-6'>Wallet created successfully!</p>
                        <div className='flex justify-end'>
                            <button
                                onClick={toggleNewAccount}
                                className='bg-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-lg ml-4'
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h1 className='text-xl font-bold mb-6'>Create New Wallet</h1>
                        <h1 className='text-md mb-6'>
                            Do you really want to create a New Account?
                        </h1>
                        <button
                            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'
                            onClick={createNewWallet}
                        >
                            Create
                        </button>
                        <button
                            onClick={toggleNewAccount}
                            className='bg-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-lg mt-4 sm:mt-0 ml-4'
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </div>



    )
}

export default CreateNewAccount