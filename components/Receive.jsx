import React, { useState, useRef, useContext } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import AccountInfo from './contexts/AccountInfo';
function Receive() {
    const userAddress = useContext(AccountInfo)
    const [popUp, setPopUp] = useState(false)
    function togglePopUp() {
        setPopUp(prev => !prev)
    }
    const divRef = useRef(null);
    const handleCopy = () => {
        const range = document.createRange();
        range.selectNode(divRef.current);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        try {
            document.execCommand('copy');
            console.log('Text copied!');
        } catch (error) {
            console.error('Copy failed:', error);
        }

        window.getSelection().removeAllRanges();
    };
    return (
        <div className=''>
            {popUp && (
                <div className='fixed top-0 left-0 right-0 bottom-0 text-center bg-gray-800 bg-opacity-50 flex flex-row items-center justify-center z-50'>
                    <div className='bg-white rounded-lg overflow-hidden shadow-xl relative lg:mx-0 mx-5'>
                        <button className='absolute top-0 right-0 p-4 mr-5 hover:scale-150 duration-100 transition' onClick={togglePopUp}>
                            X
                        </button>
                        <div className='lg:p-20'>
                            <div className='p-10 pb-5'>
                                <QRCodeSVG className='text-center mx-auto' value={`ethereum:${userAddress}`} />
                            </div>
                            <h1 className='mt-5 p-5 pb-14 lg:pb-0  hover:cursor-pointer lg:text-lg sm:text-sm whitespace-normal max-h-32 overflow-y-auto' ref={divRef} onClick={handleCopy}>
                                {userAddress}
                            </h1>
                        </div>
                    </div>
                </div>
            )}
            <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg' onClick={togglePopUp}>
                Receive
            </button>
        </div>

    )
}

export default Receive