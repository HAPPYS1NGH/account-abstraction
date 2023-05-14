import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import Settings from './Settings';
function Account(props) {


    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    function toggleDropdown() {
        setIsDropdownOpen(prev => !prev)
    }
    return (
        <div className="m-10 bg-white p-10 rounded-xl shadow-lg">
            <div className="flex items-center">
                <h1 className="text-3xl font-bold">Account 1</h1>
                <button className='ml-auto p-2 ' onClick={props.init}>
                    <Image src="/../public/images/refresh.png" alt="refresh" height={20} width={20} className={props.refresh ? `animate-spin` : ""} />
                </button>
                <button
                    onClick={toggleDropdown}
                    className="rounded-lg"
                >
                    <Image src="/../public/images/settings.png" alt="settings" height={30} width={30} />
                </button>
                {isDropdownOpen && <Settings address={props.address} toggleDropdown={toggleDropdown} privateKey={props.privateKey} />}
            </div>
            <div className="flex items-center mt-6">
                <h1 className="text-lg font-bold text-gray-500">Address:</h1>
                <h1 className="ml-4 font-mono text-sm break-all">{props.address ? props.address : "Loading..."}</h1>
            </div>
            <div className="flex items-center mt-10">
                <h1 className="text-lg font-bold text-gray-500">Balance:</h1>
                <h1 className="ml-4 font-bold">{props.balance ? props.balance : "Loading..."}</h1>
                <Image src="/../public/images/matic.png" alt="matic" height={30} width={30} className="ml-4" />
            </div>
        </div>
    )
}

export default Account