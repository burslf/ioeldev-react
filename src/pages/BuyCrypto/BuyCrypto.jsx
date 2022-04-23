import transakSDK from '@transak/transak-sdk'
import { useEffect } from 'react';
import { useMoralisWeb3Api } from 'react-moralis';
import './buyCrypto.scss';


const BuyCrypto = () => {
    let transak = new transakSDK({
        apiKey: 'fac33349-fa9a-40aa-bfe4-f256c40faa45',  // Your API Key
        environment: 'STAGING', // STAGING/PRODUCTION
        defaultCryptoCurrency: 'ETH',
        walletAddress: '', // Your customer's wallet address
        themeColor: '000000', // App theme color
        fiatCurrency: '', // INR/GBP
        email: '', // Your customer's email address
        redirectURL: '',
        hostURL: window.location.origin,
        widgetHeight: '540px',
        widgetWidth: '350px'
    });

    useEffect(() => {
 
    }, [])

    const buyCrypto = () => {
        transak.init();
        transak.on(transak.ALL_EVENTS, (data) => {
            console.log(data)
        })
        transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
            console.log(orderData)
            transak.close()
        })
    }
    
    return (
        <div className="swap-ctnr">
            <div id="ramp-container" onClick={() => buyCrypto()} className="card">
                <h1 className='text-xl font-semibold'>Buy Crypto</h1>
            </div>
        </div>
    )
}

export default BuyCrypto