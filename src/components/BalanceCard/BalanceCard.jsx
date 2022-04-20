import { useEffect, useState } from 'react';
import { auth, balance, chain } from '../../services/auth';
import './balanceCard.scss';

const BalanceCard = () => {
    const [userBalance, setUserBalance] = useState(null);
    const [user, setUser] = useState(null);
    const [currency, setCurrency] = useState(null);

    useEffect(() => {
        auth.subscribe(r => setUser(r))
        balance.subscribe(r => setUserBalance(r))
        chain.subscribe(r => {
            if (r) {
                if (r == '0x1' || r == '0x2a' || r == '0x3' || r == '0x4' || r == '0x5') {
                    setCurrency('ETH')
                } else if (r == '0x38') {
                    setCurrency('BNB')
                } else if (r == '0x89') {
                    setCurrency('MATIC')
                }
            }
        });
    }, []);


    return (
        <div className="balance-card">
            <div className="balance">
                <div className="text">
                    Balance:
                </div>
                <div >
                    {user ? `${userBalance} ${currency}` : 'Connect your Metamask'}
                </div>
            </div >
            <div className="add-fund">
                {!user && <span className='material-icons'>arrow_upward</span>}
                {user && <span>Add funds</span>}
            </div>
        </div>
    )
}


export default BalanceCard