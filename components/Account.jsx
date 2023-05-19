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
                {isDropdownOpen && <Settings address={props.address} toggleDropdown={toggleDropdown} privateKey={props.privateKey} />}
            </div>
            <div className="flex items-start lg:items-center mt-5 lg:mt-10">
                <h1 className="lg:text-lg text-base font-bold text-black">Address:</h1>
                <h1 className="lg:ml-4 ml-2 font-mono lg:text-md text-sm break-all">{props.address ? props.address : "Loading..."}</h1>
            </div>
            <div className="flex items-center mt-4 lg:mt-6">
                <h1 className="lg:text-lg text-base font-bold text-black">Balance:</h1>
                <h1 className="lg:ml-4 ml-2 lg:text-md text-sm">{props.balance ? props.balance : "Loading..."}</h1>
                <Image src="/images/matic.png" alt="matic" height={30} width={30} className="ml-4 text-sm " />
            </div>
        </div>
    )
}

export default Account