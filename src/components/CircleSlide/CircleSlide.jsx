import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { playerService } from '../../services/player';
import { getGatewayUrl } from '../../utils/utils';
import './circleSlide.scss';

const CircleSlide = (props) => {
    let title = props.title;
    let allSingles = props.allSingles;
    let currSongId = props.currSongId;
    let imageEmpty = props.imageEmpty;

    useEffect(() => {
        console.log(allSingles)
    }, []);

    const setCurrentSong = (currSong) => {
        playerService.setShowPlayer(true)
        playerService.setCurrentSong(currSong)
    }

    return (
        <section className="tokens-overview">
            <div className="head">
                <h1 className='font-semibold my-7 text-xl'>{title}</h1>
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
                        &&
                        allSingles.map((t, i) => {
                            return (
                                <div onClick={(e) => setCurrentSong(t)} className="token" key={i}>
                                    <img className={(currSongId == t.id) ? "playing" : ""} src={t.artwork ? getGatewayUrl(t.artwork) : "/assets/images/no-logo.png"} alt="" srcSet="" />
                                    <span className='mt-4 text-sm'>{t.song}</span>
                                </div>
                            )
                        })
                    }
                    {imageEmpty
                        &&
                        <div className="token" >
                            <img src={imageEmpty} alt="" srcSet="" />
                            <span className='mt-4 text-sm'>Coming soon</span>
                        </div>}

                </div>
            </div>

        </section >
    )
}

export default CircleSlide;