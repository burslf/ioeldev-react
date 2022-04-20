import './home.scss';
import { useEffect, useState } from 'react';
import BalanceCard from '../../components/BalanceCard/BalanceCard';
import { balance, tokens } from '../../services/auth';
import SingleABI from '../../assets/contract/SingleABI.json';
import contractAddress from '../../assets/contract/contractAddress';
import { useMoralis } from 'react-moralis';
import { singles, songsService } from '../../services/songs';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getGatewayUrl } from '../../utils/utils';
import { currentSongId, playerService } from '../../services/player';

const Home = () => {
    const { Moralis } = useMoralis()
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

    const setCurrentSong = (currSong) => {
        playerService.setShowPlayer(true)
        playerService.setCurrentSong(currSong)
    }


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

            <section className="tokens-overview">
                <div className="head">
                    <h1 className='font-semibold my-7 text-xl'>Singles</h1>
                    <div className="see-all">
                        <Link to={'/songs'}>
                            <span className='cursor-pointer'>See all</span>
                        </Link>
                        {/* <mat-icon>keyboard_arrow_right</mat-icon> */}
                    </div>
                </div>
                <div className="tokens">
                    <div className="overflow-hidden">
                        {
                            allSingles
                                ?
                                allSingles.map((t, i) => {
                                    return (
                                        <div onClick={(e) => setCurrentSong(t)} className="token" key={i}>
                                            <img className={(currSongId == t.id) ? "playing" : ""} src={t.artwork ? getGatewayUrl(t.artwork) : "/assets/images/no-logo.png"} alt="" srcSet="" />
                                            <span className='mt-4 text-sm'>{t.song}</span>
                                        </div>
                                    )
                                })
                                :
                                <div className="token" >
                                </div>
                        }

                    </div>
                </div>

            </section >

            <section className="tokens-overview">
                <div className="head">
                    <h1 className='font-semibold my-7 text-xl'>Albums</h1>
                    <div className="see-all">
                        <Link to={'/'}>
                            <span className='cursor-pointer'>See all</span>
                        </Link>
                        {/* <mat-icon>keyboard_arrow_right</mat-icon> */}
                    </div>
                </div>
                <div className="tokens">
                    <div className="overflow-hidden">
                        <div className="token" >
                            <img src="/assets/images/no-entry.png" alt="" />
                            <span className='mt-4 text-sm' >Coming Soon...</span>
                        </div>
                    </div>
                </div>

            </section >

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