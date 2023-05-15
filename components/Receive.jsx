import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react';

function Receive(props) {
    const [popUp, setPopUp] = useState(false)
    function togglePopUp() {
        setPopUp(prev => !prev)
    }
    return (
        <div className=''>
            {popUp
                &&
                <div className='fixed top-0 left-0 right-0 bottom-0 text-center bg-gray-800 bg-opacity-50 flex flex-row items-center justify-center z-50'>
                    <div className='bg-white rounded-lg overflow-hidden shadow-xl relative'>
                        <button className='absolute top-0 right-0 p-4 mr-5 hover:scale-150 duration-100 transition ' onClick={togglePopUp}>X</button>
                        <div className='p-20'>
                            <QRCodeSVG className='text-center mx-auto' value={`ethereum:${props.userAddress}`} />
                            <h1 className='mt-5 p-5'>{props.userAddress}</h1>
                        </div>
                    </div>
                </div>
            }
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ' onClick={togglePopUp}>Receive</button>
        </div>
    )
}

export default Receive