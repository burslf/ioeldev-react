import { BehaviorSubject } from "rxjs";

const bpm = new BehaviorSubject("")
const song = new BehaviorSubject("")
const artwork = new BehaviorSubject(null)
const key = new BehaviorSubject("")

const uploadSongService = {
    setBpm: function(p) {
        bpm.next(p)
    },
    setSong: function(s) {
        song.next(s)
    },
    setArtwork: function(ipfsPath) {
        artwork.next(ipfsPath)
    },
    setKey: function(comp) {
        key.next(comp)
    },
    
    
}

export {
    bpm,
    song,
    artwork,
    key,
    uploadSongService
}