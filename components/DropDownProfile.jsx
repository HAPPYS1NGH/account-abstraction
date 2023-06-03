import React, { useState, useContext } from 'react'
import CreateNewAccount from './CreateNewAccount'
import ImportAccount from './ImportAccount'
import Image from 'next/image'
import AccountBalance from './contexts/AccountBalance';

function DropDownProfile(props) {
    const [newAccount, setNewAccount] = useState(false)
    const [importAccount, setImportAccount] = useState(false)  
    const balance = useContext(AccountBalance)

    function toggleNewAccount() {
        setNewAccount(prev => !prev)
    }
    function toggleImportAccount() {
        setImportAccount(prev => !prev)
    }
    return (
        <div className='absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-md z-50'>
            <div className='p-4'>
                <h1 className='text-lg font-medium text-gray-800'>My Accounts</h1>
                <button
                    onClick={props.toggleDropdown}
                    className='absolute top-2 right-2 text-gray-600 hover:text-gray-500'
                >
                    <svg
                        className='h-5 w-5'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                    >
                        <path
                            fillRule='evenodd'
                            d='M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                        />
                    </svg>
                </button>
            </div>
            <hr />
            <div className='p-4 flex items-center'>
                <div className='bg-gray-200 rounded-full p-1'>
                    <Image
                        src='/images/user.png'
                        alt='Profile Pic'
                        height={30}
                        width={30}
                        className='rounded-full'
                    />
                </div>
                <div className='ml-3'>
                    <p className='text-gray-800 font-medium'>Account 1</p>
                    <p className='text-gray-500'>{balance}</p>
                </div>
            </div>
            <hr />
            <div className='p-4'>
                <button onClick={toggleNewAccount} className='w-full'>
                    <p className='text-gray-800 hover:bg-gray-50 p-2'>Create New Account</p>
                </button>
                {newAccount && (
                    <CreateNewAccount
                        toggleNewAccount={toggleNewAccount}
                        privateKey={props.privateKey}
                        setPrivateKey={props.setPrivateKey}
                        toggleDropdown={props.toggleDropdown}
                    />
                )}

                <button onClick={toggleImportAccount} className='w-full'>
                    <p className='text-gray-800 hover:bg-gray-50 p-2'>Import Account</p>
                </button>
                {importAccount && (
                    <ImportAccount
                        toggleImportAccount={toggleImportAccount}
                        privateKey={props.privateKey}
                        setPrivateKey={props.setPrivateKey}
                        config={props.config}
                        toggleDropdown={props.toggleDropdown}
                    />
                )}
            </div>
        </div>
    )
}

export default DropDownProfile