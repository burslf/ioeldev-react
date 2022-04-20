import { useEffect, useState } from 'react';
import { audioPlayer, currentSongId, isPlaying, playerService } from '../../services/player';
import { singles } from '../../services/songs';
import { getGatewayUrl } from '../../utils/utils';
import './songs.scss';

const Songs = () => {
    const [allSongs, setAllSongs] = useState(null);
    const [player, setAudioPlayer] = useState(null);
    const [currSongId, setCurrSongId] = useState(null);
    const [isPlayed, setIsPlayed] = useState(false)

    useEffect(() => {
        singles.subscribe(r => { setAllSongs(r) })
        audioPlayer.subscribe(r => setAudioPlayer(r))
        currentSongId.subscribe(r => setCurrSongId(r))
        isPlaying.subscribe(r => {
            console.log(r)
            setIsPlayed(r)
        })
    }, [])

    const setCurrentSong = (currSong) => {
        playerService.setShowPlayer(true)
        playerService.setCurrentSong(currSong)
    }

    const pausePlayer = () => {
        player.current.pause()
        playerService.setIsPlaying(false)
    }

    const playPlayer = () => {
        player.current.play()
        playerService.setIsPlaying(true)
    }

    return (
        <div className='songs-ctnr'>
            <h3 className='text-center text-2xl'>Songs</h3>

            <div className='songs-list'>
                {
                    allSongs && allSongs.map((s, i) => {
                        return (
                            <div key={i} onClick={async () => await setCurrentSong(s)} className="song rounded-lg">
                                <div className="infos">
                                    <div className="titles">
                                        <div className='artist text-xs'>{s.artist}</div>
                                        <div className='title text-md'>{s.song}</div>
                                    </div>
                                    <div className="cover">
                                        <img className={(currSongId == s.id) ? "playing" : ""} src={s.artwork ? getGatewayUrl(s.artwork) : `/assets/images/no-logo.png`} alt="" />
                                    </div>
                                    <div className="play-pause-btn">
                                        {(currSongId == s.id && isPlayed)
                                            ?
                                            <span onClick={() => pausePlayer(s)} className="material-icons">pause</span>
                                            :
                                            <span onClick={() => setCurrentSong(s)} className="material-icons">play_arrow</span>
                                        }
                                    </div>
                                </div>
                                {/* <div className="audio">
                                    <audio controls >
                                        <source src={getGatewayUrl(s.source)} type="audio/mpeg" />
                                    </audio>

                                </div> */}

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Songs