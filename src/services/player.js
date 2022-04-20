import { BehaviorSubject } from "rxjs";
import { getGatewayUrl } from "../utils/utils";

const duration = new BehaviorSubject(null)
const currentSongSrc = new BehaviorSubject(null)
const currentSongId = new BehaviorSubject(null)
const audioPlayer = new BehaviorSubject(null)
const isPlaying = new BehaviorSubject(null)
const currentArtist = new BehaviorSubject(null)
const currentTitle = new BehaviorSubject(null)
const currentTime = new BehaviorSubject(0)
const currentDuration = new BehaviorSubject(0)
const showPlayer = new BehaviorSubject(false)
const hasSeeked = new BehaviorSubject(false);

const playerService = {
    setCurrentSongId: function (id) {
        currentSongId.next(id)
    },
    setDuration: function (s) {
        duration.next(s)
    },
    setCurrentSongSrc: function (c) {
        currentSongSrc.next(c)
    },
    setAudioPlayer: function (c) {
        audioPlayer.next(c)
    },
    setCurrentArtist: function (c) {
        currentArtist.next(c)
    },
    setCurrentTitle: function (c) {
        currentTitle.next(c)
    },
    setCurrentTime: function (t) {
        currentTime.next(t)
    },
    setCurrentDuration: function (d) {
        currentDuration.next(d)
    },
    setIsPlaying: function (i) {
        isPlaying.next(i)
    },
    setCurrentSong: function (currSong) {
        if(currSong.id !== currentSongId.getValue()){
        this.setCurrentTitle(currSong.song)
        this.setCurrentArtist(currSong.artist)
            this.setCurrentSongSrc("")
            setTimeout(() => {this.setCurrentSongSrc(getGatewayUrl(currSong.source))}, 100) 
            this.setCurrentSongId(currSong.id)
        }
    },
    setShowPlayer: function(i) {
        showPlayer.next(i)
    },
    setHasSeeked: function(s) {
        hasSeeked.next(s)
    }

}

export {
    duration,
    playerService,
    currentSongSrc,
    audioPlayer,
    isPlaying,
    currentArtist,
    currentTitle,
    currentTime,
    currentDuration,
    currentSongId,
    showPlayer,
    hasSeeked
}