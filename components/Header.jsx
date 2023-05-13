import { useState } from 'react';
import Image from 'next/image';
import DropDownProfile from './DropDownProfile';

const Header = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    }

    return (
        <div className='flex flex-row'>
            <h1 className=''>Happy Wallet</h1>
            <div className='relative ml-auto'>
                <button
                    onClick={toggleDropdown}
                    className='rounded-full h-8 w-8 bg-gray-300 flex items-center justify-center'
                >
                    <Image
                        src="/../public/images/profile.jpg"
                        alt='Profile Pic'
                        height={30}
                        width={30}
                        className='rounded-full'
                    />
                </button>
                {isDropdownOpen && (
                    <DropDownProfile isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} balance={props.balance} privateKey={props.privateKey} setPrivateKey={props.setPrivateKey} config={props.config} />
                )}
            </div>
        </div>
    );
}

export default Header;
