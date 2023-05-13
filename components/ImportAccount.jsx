import React, { useState } from 'react'
import { Presets } from "userop";
import { ethers } from "ethers";

function ImportAccount({ config, setPrivateKey, privateKey, toggleImportAccount }) {
    const [importedPrivateKey, setImportedPrivateKey] = useState();
    const [fetch, setFetch] = useState(false)

    async function importUsingPrivateKey() {
        if (typeof window !== 'undefined') {
            localStorage.setItem("privateKeyAA", importedPrivateKey);
            let privateKeyAA = localStorage.getItem('privateKeyAA');
            setPrivateKey(privateKeyAA);
            console.log("Private Key after changing " + privateKey);
            setFetch(true);
        }
    }
    return (
        <div className='fixed top-0 left-0  bg-white rounded-lg shadow-lg p-4 w-full h-full justify-center'>
            <h1 className='text-2xl p-10 mt-20'>Enter your private Key</h1>
            <div className="mb-4 mx-10">
                <label className="block font-bold mb-2" htmlFor="walletFromPrivateKey">
                    Key
                </label>
                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    id="importedPrivateKey"
                    type="text"
                    name="importedPrivateKey"
                    value={importedPrivateKey}
                    onChange={(e) => setImportedPrivateKey(e.target.value)}
                    placeholder="2b83e...."
                />
            </div>

            <div className='flex justify-center gap-4'>
                {fetch ?
                    <h1>Imported Successfully</h1>
                    :
                    <button className="bg-blue-500 mx-10 my-5 hover:bg-blue-600 text-white py-2 px-4 rounded-lg" onClick={importUsingPrivateKey}>Import new Wallet through Private Key
                    </button>
                }
                <button onClick={toggleImportAccount} className='bg-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-lg'>Take me Back</button>
            </div>
        </div>
    )
}

export default ImportAccount