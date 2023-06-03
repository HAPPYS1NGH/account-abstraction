import React, { useState, useContext } from 'react'
import Link from 'next/link'
import AccountInfo from "./contexts/AccountInfo";

function Settings({toggleDropdown, privateKey }) {
    const [showKey, setShowKey] = useState(false);
    const [showKeyConfirmed, setShowKeyConfirmed] = useState(false);
    const address = useContext(AccountInfo)

    function toggleShowKey() {
        setShowKey(prev => !prev)
    }
    function toggleShowKeyConfirm() {
        setShowKeyConfirmed(prev => !prev)
    }
    function clearShowKey() {
        setShowKey(false);
        setShowKeyConfirmed(false)
        toggleDropdown()
    }
    return (
        <div className="relative">
            <div className="absolute top-10 right-0 w-60 bg-white shadow-lg rounded-md">
                <div className="flex items-center justify-between px-4 py-2">
                    <h1 className="text-lg font-bold text-gray-800">Settings</h1>
                    <button onClick={toggleDropdown} className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                </div>
                <div className="py-2">
                    <Link href={`https://mumbai.polygonscan.com/address/${address}`} target="_blank">
                        <button className="w-full px-4 py-2 text-gray-800 hover:bg-gray-50 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
                            View Account in Explorer
                        </button>
                    </Link>
                    <button onClick={toggleShowKey} className="w-full px-4 py-2 text-gray-800 hover:bg-gray-50 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
                        Export Private Key
                    </button>
                    {showKey && (
                        <div className="fixed top-0 left-0 bg-white rounded-lg shadow-lg p-4 w-full h-full flex flex-col items-center justify-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-8">Keep it Safe</h1>
                            <div className="flex flex-col gap-4 items-center">
                                {showKeyConfirmed ? (<>
                                    <div className="bg-gray-200 p-4 rounded-lg w-full break-all">
                                        {privateKey}
                                    </div>
                                    <button onClick={clearShowKey} className="bg-blue-500 hover:bg-blue-600  text-white py-2 px-4 rounded-md">
                                        Go Back
                                    </button>
                                </>
                                ) : (
                                    <>
                                        <div className="text-gray-800 text-center">
                                            Are you sure you want to reveal your private key?
                                        </div>
                                        <div className="flex gap-4">
                                            <button onClick={toggleShowKeyConfirm} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                                                Yes
                                            </button>
                                            <button onClick={clearShowKey} className="bg-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-md">
                                                No
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}

export default Settings