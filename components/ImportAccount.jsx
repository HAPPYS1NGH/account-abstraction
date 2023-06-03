import React, { useState } from 'react'
import { Presets } from "userop";
import { ethers } from "ethers";

function ImportAccount({ config, setPrivateKey, privateKey, toggleImportAccount, toggleDropdown }) {
    const [importedPrivateKey, setImportedPrivateKey] = useState();
    const [fetch, setFetch] = useState(false)

    async function importUsingPrivateKey() {
        if (typeof window !== 'undefined') {
            localStorage.setItem("privateKeyAA", importedPrivateKey);
            let privateKeyAA = localStorage.getItem('privateKeyAA');
            setPrivateKey(privateKeyAA);
            console.log("Private Key after changing " + privateKey);
            toggleDropdown()
            setFetch(true);
        }
    }
    return (
        <div className="backdrop-filter backdrop-blur-sm fixed inset-0 z-50">
            <div className='fixed backdrop-filter backdrop-blur top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 max-w-md w-full'>
                <h1 className='text-lg font-bold mb-6'>Import Account</h1>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="importedPrivateKey">
                        Enter Private Key
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
                {fetch ? (
                    <div className='flex flex-col'>
                        <p className='text-green-500 font-bold mb-6'>Account imported successfully!</p>
                        <div className='flex justify-end'>
                            <button
                                onClick={toggleImportAccount}
                                className='bg-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-lg mr-4'
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-end mt-6'>
                        <button
                            onClick={toggleImportAccount}
                            className='bg-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-lg mr-4'
                        >
                            Cancel
                        </button>
                        <button
                            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'
                            onClick={importUsingPrivateKey}
                            disabled={!importedPrivateKey}
                        >
                            Import
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default ImportAccount