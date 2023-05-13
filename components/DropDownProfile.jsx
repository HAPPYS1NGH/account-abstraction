import React, { useState } from 'react'
import CreateNewAccount from './CreateNewAccount'
import ImportAccount from './ImportAccount'

function DropDownProfile(props) {
    const [newAccount, setNewAccount] = useState(false)
    const [importAccount, setImportAccount] = useState(false)
    function toggleNewAccount() {
        setNewAccount(prev => !prev)
    }
    function toggleImportAccount() {
        setImportAccount(prev => !prev)
    }
    return (
        <>
            <div className='absolute top-10  right-0 w-80 bg-white shadow-lg rounded-md  text-center'>
                <div className='flex p-4'>
                    <h1 className='block  text-gray-800 text-xl '>My Accounts</h1>
                    <button className='block ml-auto text-gray-800 hover:text-gray-500 text-lg' onClick={props.toggleDropdown}>Back</button>
                </div>
                <hr />
                <div className='p-4  text-gray-800 hover:bg-gray-50 text-start flex'>
                    <p >Account 1</p>
                    <p className='ml-auto'>{props.balance}</p>
                </div>
                <hr />
                <button onClick={toggleNewAccount}>
                    <p className='block  text-gray-800 hover:bg-gray-50 p-4'>Create New Account</p>
                </button>
                {newAccount && <CreateNewAccount toggleNewAccount={toggleNewAccount} privateKey={props.privateKey} setPrivateKey={props.setPrivateKey} />}

                <button onClick={toggleImportAccount}>
                    <p className='block  text-gray-800 hover:bg-gray-50 p-4'>Import Account</p>
                </button>
                {importAccount && <ImportAccount toggleImportAccount={toggleImportAccount} privateKey={props.privateKey} setPrivateKey={props.setPrivateKey} config={props.config} />}
            </div>
        </>
    )
}

export default DropDownProfile