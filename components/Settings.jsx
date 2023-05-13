import React, { useState } from 'react'
import Link from 'next/link'
function Settings({ address, toggleDropdown, privateKey }) {
    const [showKey, setShowKey] = useState(false);
    const [showKeyConfirmed, setShowKeyConfirmed] = useState(false);
    function toggleShowKey() {
        setShowKey(prev => !prev)
    }
    function toggleShowKeyConfirm() {
        setShowKeyConfirmed(prev => !prev)
    }
    function clearShowKey() {
        setShowKey(false);
        setShowKeyConfirmed(false)

    }
    return (
        <div className=' relative'>
            <div className='absolute top-10  right-0 w-60 bg-white shadow-lg rounded-md'>
                <div className='flex p-4'>
                    <h1 className='block  text-gray-800 text-xl '>Settings</h1>
                    <button className='block ml-auto text-gray-800 hover:text-gray-500 text-lg' onClick={toggleDropdown}>Back</button>
                </div>
                <Link href={`https://mumbai.polygonscan.com/address/${address}`} target='_blank'>
                    <div className='p-4  text-gray-800 hover:bg-gray-50 text-start'>
                        View Account in Explorer
                    </div>
                </Link>
                <button className='p-4  text-gray-800 hover:bg-gray-50 text-start flex' onClick={toggleShowKey}>
                    <div>Export Private Key</div>
                </button>
                {showKey &&
                    <div className='fixed top-0 left-0  bg-white rounded-lg shadow-lg p-4 w-full h-full justify-center'>
                        <h1 className='text-2xl p-10 mt-20'>Keep it Safe</h1>
                        <div className='flex justify-center gap-4'>

                            {showKeyConfirmed ? <h1 className=' text-gray-800 text-2xl'>{privateKey}</h1>
                                :
                                <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg' onClick={toggleShowKeyConfirm}>Reveal</button>}
                            <button onClick={clearShowKey} className='bg-gray-300 hover:bg-gray-100 text-black py-2 px-4 rounded-lg'>Take me Back</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Settings