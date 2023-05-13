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
        <div className='m-10'>
            <div className='flex my-2'>
                <h1>Account 1</h1>
                <button onClick={toggleDropdown} className='ml-auto'>
                    <Image src="/../public/images/settings.jpg" alt='settings' height={30} width={30} />
                </button>
                {isDropdownOpen && <Settings address={props.address} toggleDropdown={toggleDropdown} privateKey={props.privateKey} />}
            </div>
            <div className='flex  my-2'>
                <h1>Address</h1>
                <h1 className='ml-20 '>{props.address}</h1>
            </div>
            <div className='flex  mt-20'>
                <h1>{props.balance}</h1>
                <Image src="/../public/images/matic.png" alt='settings' height={30} width={30} className='ml-5' />
            </div>
        </div>
    )
}

export default Account