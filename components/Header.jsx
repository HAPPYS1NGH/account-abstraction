import { useState } from 'react';
import Image from 'next/image';
import DropDownProfile from './DropDownProfile';
import Link from 'next/link';
const Header = (props) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    }

    return (
        <div className="flex items-center justify-between py-4 gap-5">
            <Link href="/" className="text-xl font-bold">Happy Wallet</Link>
            <Link href="/Guide" className='text-lgfont-medium'>Guide</Link>
            <Link href="/Circle" className='text-lgfont-medium'>Circle</Link>
            <div className="relative ml-auto">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full focus:outline-none"
                >
                    <Image
                        src="/images/user.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-8 h-8 rounded-full"
                    />
                </button>
                {!props.disable && isDropdownOpen && (
                    <DropDownProfile isDropdownOpen={isDropdownOpen} toggleDropdown={toggleDropdown} balance={props.balance} privateKey={props.privateKey} setPrivateKey={props.setPrivateKey} config={props.config} />
                )}
            </div>
        </div>

    );
}

export default Header;
