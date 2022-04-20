import { BehaviorSubject } from "rxjs";

const singles = new BehaviorSubject(null)

const songsService = {
    setSingles : function(s) {
        singles.next(s)
    }
    
    
}

export {
    singles,
    songsService
}