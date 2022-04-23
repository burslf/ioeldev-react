import './home.scss';
import { useEffect, useState } from 'react';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import { tokens } from '../../services/auth';
import { singles } from '../../services/songs';
import { currentSongId } from '../../services/player';
import CircleSlide from '../../components/CircleSlide/CircleSlide';

const Home = () => {
    const [userTokens, setTokens] = useState(null);
    const [allSingles, setAllSingles] = useState(null);
    const [currSongId, setCurrSongId] = useState(null);

    useEffect(() => {
        tokens.subscribe(r => setTokens(r))
    }, []);

    useEffect(() => {
        singles.subscribe(r => setAllSingles(r))
        currentSongId.subscribe(r => setCurrSongId(r))
    }, [])


    return (
        <div className="home">
            <section className="discover">
                <div className="left">
                    <h2 className="font-bold my-12 text-2xl">
                        Web3, Blockchain, Music, those are the words that talks to me
                    </h2>
                    <p className='mt-12 mb-4'>
                        Unlike traditional data storage, blockchain relies upon distributed storage and decentralized processing.
                    </p>
                    <p className="mb-12">
                        That way, we are ensuring data integrity using blockchain technology. We have decided to integrate this system in the music industry.
                    </p>
                    <BalanceCard />
                </div>
                <div className="right">
                    <img className="oculus-img" src="/assets/images/blockchain.png" alt="" srcSet="" />
                </div>
            </section>

            <CircleSlide title={'Type Beats'} currSongId={currSongId} allSingles={allSingles}></CircleSlide>
            <CircleSlide title={'Drumkits'} currSongId={""} imageEmpty={'/assets/images/no-entry.png'} ></CircleSlide>



        </div >
    )
}

export default Home







// {/* <section className="tokens-overview">
// <div className="head">
//     <h1 className='font-semibold my-7 text-xl'>Your Tokens</h1>
//     <div className="see-all">
//         <span>See all</span>
//         {/* <mat-icon>keyboard_arrow_right</mat-icon> */}
//     </div>
// </div>
// <div className="tokens">
//     <div className="overflow-hidden">
//         {
//             userTokens
//                 ?
//                 userTokens.map((t, i) => {
//                     return (
//                         <div className="token" key={i}>
//                             <img src={t.logo ? t.logo : "/assets/images/no-logo.png"} alt="" srcSet="" />
//                             <span className='mt-4'>{t.symbol}</span>
//                         </div>
//                     )
//                 })
//                 :
//                 <div className="token" >
//                     <img src="/assets/images/no-logo.png" alt="" srcSet="" />
//                     <span className='mt-4'>You aren't logged in</span>
//                 </div>
//         }

//     </div>
// </div>

// </section > */}