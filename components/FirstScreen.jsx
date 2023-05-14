import React, { useEffect } from 'react'

function FirstScreen({ setFirstVisit }) {
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('firstVisit', "Visited")
            setFirstVisit(false);
        }, 1000)
    })
    return (
        <div className=' h-screen flex '>
            <div className='text-center text-3xl self-center rounded-lg shadow-lg  p-4 mx-auto px-24 bg-white '>
                Creating a New Account For You......
            </div>
        </div>
    )
}

export default FirstScreen