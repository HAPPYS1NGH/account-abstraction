import { Circle, CircleEnvironments, PaymentIntentCreationRequest } from "@circle-fin/circle-sdk";
import crypto from 'crypto';

const circle = new Circle(
    `${process.env.NEXT_PUBLIC_API_KEY_CIRCLE}`,
    CircleEnvironments.sandbox      // API base url
);
import React, { useState } from 'react'

function ERC20Tokens() {
    const [id, setId] = useState();

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
        const cryptoPayment = await circle.cryptoPaymentIntents.getPaymentIntent(id);
        console.log(cryptoPayment);
    }
    return (
        <div>
            <h1>It is</h1>
            <button onClick={createCryptoPayment}>Click</button>
            <h2>Get Receipt</h2>
            <button onClick={getCryptoPayment}>Get it</button>
            <button className="p-3 bg-slate-300" onClick={getAccountConfig}>Get it</button>

            {
                id && <h1>Id is {id}</h1>
            }
        </div>
    )
}

export default ERC20Tokens
