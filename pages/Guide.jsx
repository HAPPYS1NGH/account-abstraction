import Header from '@/components/Header'
import React, { useState } from 'react'
import Link from 'next/link';

function Guide() {
    const [showAdvanced, setShowAdvanced] = useState(false);
    return (
        <div>
            <div className="xl:px-90 md:px-4 sm:px-2 bg-gray-100 rounded-lg h-screen">
                <div className="lg:mx-44 mx-4 bg-gray-100 rounded-lg h-full">
                    <Header disable={true} />
                    <div className="py-8 px-4 bg-white p-10 rounded-xl shadow-lg ">
                        <h1 className="text-2xl font-semibold mb-4"> Cryptocurrencies are not stocks. It is money like Rupees ,USD or Pounds.</h1>
                        <ul className="ml-10 text-left list-disc mb-4">
                            <li>
                                Here is a simple account just like Bank and you have a single password.
                            </li>
                            <li>
                                You have to take care of it , its fancy name is PRIVATE KEY.
                            </li>
                            <li>
                                Store it privately 😎 as there is no verification if your password is stolen then they have access to your money.
                            </li>
                            <li >Transfer money to this account using your bank account via any card.</li>
                            <li>For now, Fund with MATIC from <Link href="https://faucet.polygon.technology/" className='hover:underline text-blue-500'>here </Link></li>
                        </ul>
                        <h2 className="text-lg font-semibold mb-4">Advanced Options</h2>
                        <ol className="list-decimal text-left pl-6">
                            <li className="mb-2">Import your key into MetaMask.</li>
                            <li className="mb-2">Manage access to your account.</li>
                            <li>Choose who can transfer funds.</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Guide