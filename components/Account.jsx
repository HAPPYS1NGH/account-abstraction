import React from 'react'
import Image from 'next/image'
import { useState, useContext } from 'react'
import Settings from './Settings';
import AccountBalance from './contexts/AccountBalance';
import AccountInfo from "./contexts/AccountInfo";

function Account(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const balance = useContext(AccountBalance);
    const address = useContext(AccountInfo)
    function toggleDropdown() {
        setIsDropdownOpen(prev => !prev)
    }
    return (
        <div className="">
            <div className="flex items-center pb-2">
                <h1 className="lg:text-3xl text-xl font-bold">Account 1</h1>
                <button className='ml-auto p-2 ' onClick={props.init}>
                    <Image src="/images/refresh.png" alt="refresh" height={20} width={20} className={props.refresh ? `animate-spin` : ""} />
                </button>
                <button
                    onClick={toggleDropdown}
                    className="rounded-lg"
                >
                    <Image src="/images/settings.png" alt="settings" height={30} width={30} className=' focus-visible:animate-spin' />
                </button>
                {isDropdownOpen && <Settings toggleDropdown={toggleDropdown} privateKey={props.privateKey} />}
            </div>
            <div className="flex items-start lg:items-center mt-5 lg:mt-10">
                <h1 className="lg:text-lg text-base font-bold text-black">Address:</h1>
                <h1 className="lg:ml-4 ml-2 font-mono lg:text-md text-sm break-all">{address ? address : "Loading..."}</h1>
            </div>
            <div className="flex items-center mt-4 lg:mt-6">
                <h1 className="lg:text-lg text-base font-bold text-black">Balance:</h1>
                <h1 className="lg:ml-4 ml-2 lg:text-md text-sm">{balance ? balance : "Loading..."}</h1>
                <Image src="/images/matic.png" alt="matic" height={30} width={30} className="ml-4 text-sm " />
            </div>
        </div>
    )
}

export default Account