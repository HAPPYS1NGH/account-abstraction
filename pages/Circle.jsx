import React, { useState } from 'react'
import { Circle, CircleEnvironments, PaymentIntentCreationRequest } from "@circle-fin/circle-sdk";
import Header from '@/components/Header';

function ERC20Tokens() {

    const circle = new Circle(
        `${process.env.NEXT_PUBLIC_API_KEY_CIRCLE}`,
        CircleEnvironments.sandbox      // API base url
    );

    const [id, setId] = useState();
    const [masterId, setMasterId] = useState();

    async function getAccountConfig() {
        const configResp = await circle.management.getAccountConfig();
        console.log(configResp.data);
    }

    async function createCryptoPayment() {
        const reqBody = {
            amount: {
                amount: "1.00",
                currency: "USD"
            },
            settlementCurrency: "USD",
            paymentMethods: [
                {
                    type: "blockchain",
                    chain: "ETH"
                }
            ],
            idempotencyKey: 'ba943ff1-ca16-49b2-ba55-1057e70ca5c7'
        };
        const resp = await circle.cryptoPaymentIntents.createPaymentIntent(reqBody);
        console.log(resp.data);
        console.log(resp.data.data.id)
        setId(resp.data.data.id);

        // setId(resp.data.id)
    }
    async function getCryptoPayment() {
        try {
            const cryptoPayment = await circle.cryptoPaymentIntents.getPaymentIntent(id);
            console.log(cryptoPayment);
            setMasterId(cryptoPayment.data.data.amountPaid.currency)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div>

            <div className="xl:px-90 md:px-4 sm:px-2 bg-gray-100 rounded-lg h-screen">
                <div className="lg:mx-44 mx-4 bg-gray-100 rounded-lg h-full">
                    <Header disable={true} />
                    <div className="py-8 px-4 bg-white p-10 rounded-xl shadow-lg ">
                        <h1 className="text-2xl font-semibold mb-4">
                            Circle (USDC)
                        </h1>
                        <div className='m-8'>
                            <h1 className='text-lg'>Create a Crypto Payment <button onClick={createCryptoPayment} className="p-2 bg-blue-300 text-sm rounded-xl ">Create</button></h1>
                            {
                                id && <h1>Id is {id}</h1>
                            }
                        </div>

                        <div className='m-8'>
                            <h2 className='text-lg block'>Get Amount Paid <button className='p-2 text-sm rounded-xl  bg-blue-300' onClick={getCryptoPayment}>Get it</button></h2>
                            {
                                masterId &&
                                <h1>Amount Paid is in {masterId}</h1>
                            }

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ERC20Tokens
