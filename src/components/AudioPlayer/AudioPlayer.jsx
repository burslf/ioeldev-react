import { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { audioPlayer, currentDuration, currentSongSrc, currentTime, hasSeeked, isPlaying, playerService, showPlayer } from '../../services/player';
import './audioPlayer.scss';
import ReactSlider from 'react-slider'

const AudioPlayer = () => {
    const [curSong, setCurSong] = useState(null)
    const [isPlayed, setIsPlayed] = useState(null)
    const [songDuration, setSongDuration] = useState(0)
    const [currTime, setCurrTime] = useState(0)
    const [seeked, setSeeked] = useState(false);
    const audioPlayerRef = useRef()

    useEffect(() => {
        currentSongSrc.subscribe(r => setCurSong(r))
        currentTime.subscribe(r => setCurrTime(r))
        currentDuration.subscribe(r => setSongDuration(r))
        isPlaying.subscribe(r => setIsPlayed(r))

    }, [])

    useEffect(() => {
        hasSeeked.subscribe(r => { setSeeked(r) })
        showPlayer.subscribe(r => {
            if (r) {
                playerService.setAudioPlayer(audioPlayerRef.current.audioEl)
            }
        })
    }, [])

    const handleListen = (e) => {
        // console.log(e)
        playerService.setIsPlaying(true)
    }

    const handleMetadataLoaded = (e) => {

    }

    const handleOnListen = (e) => {
        playerService.setCurrentTime(e)
    }

    const handleOnSeeked = (e) => {
        playerService.setHasSeeked(true)
    }

    const handlePause = (e) => {
        playerService.setIsPlaying(false)
    }

    const handleCanPlay = (e) => {
        playerService.setCurrentDuration(e.target.duration)
        if(seeked){
            if(!e.target.paused){
                e.target.play()
                playerService.setIsPlaying(true)
                playerService.setHasSeeked(false)
            }
        }else{
            e.target.play()
            playerService.setIsPlaying(true)
        }
    }

    const handleEndedSong = (e) => {
        if (e.target.paused) {
            playerService.setIsPlaying(false)
        }
    }

    const pausePlayer = () => {
        audioPlayerRef.current.audioEl.current.pause()
        playerService.setIsPlaying(false)
    }

    const playPlayer = () => {
        audioPlayerRef.current.audioEl.current.play()
        playerService.setIsPlaying(true)
    }

    const previousSong = () => {

    }

    const nextSong = () => {

    }

    function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+(s|0)}

    return (
        <>
            <ReactAudioPlayer
                ref={audioPlayerRef}
                src={curSong}
                autoPlay={false}
                controls
                onPause={(e) => handlePause(e)}
                onLoadedMetadata={(e) => handleMetadataLoaded(e)}
                onPlay={(e) => handleListen(e)}
                onListen={(e) => handleOnListen(e)}
                listenInterval={100}
                onSeeked={(e) => handleOnSeeked(e)}
                className='audio-player'
                onCanPlay={(e) => handleCanPlay(e)}
                onEnded={(e) => handleEndedSong(e)}
            />
            <div className="audioplayer-ctnr">
                <div className="play-arrows">
                    <div className="left">
                        <span className="material-icons" onClick={() => previousSong()}>skip_previous</span>
                    </div>
                    <div className="center">
                        {
                            isPlayed
                                ?
                                <span className="material-icons play-pause" onClick={() => pausePlayer()}>pause</span>
                                :
                                <span className="material-icons play-pause" onClick={() => playPlayer()}>play_arrow</span>
                        }
                    </div>
                    <div className="right">
                        <span className="material-icons" onClick={() => nextSong()}>skip_next</span>
                    </div>
                </div>
                <div className="seek-slider">
                    <span>{fmtMSS(currTime)}</span>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        min={0}
                        max={songDuration}
                        value={currTime}
                        // onBeforeChange={(value, index) =>
                        //     console.log(`onBeforeChange: ${JSON.stringify({ value, index })}`)
                        // }
                        onChange={(value, index) => {
                            playerService.setCurrentTime(value)
                            audioPlayerRef.current.audioEl.current.currentTime = value
                            // console.log(`onChange: ${JSON.stringify({ value, index })}`)
                        }}
                        onAfterChange={(value, index) => {
                            console.log(`onAfterChange: ${JSON.stringify({ value, index })}`)
                        }
                        }
                        renderThumb={(props, state) => {
                            return (
                                <div {...props}></div>
                            )
                        }}                    
                    />
                        <span>{fmtMSS(songDuration)}</span>
                </div>


            </div>

        </>
    )
}

export default AudioPlayer