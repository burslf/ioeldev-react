import { BehaviorSubject } from "rxjs";

const singleContract = new BehaviorSubject(null)

const contractsService = {
    setSingleContract : function(s) {
        singleContract.next(s)
    }
    
    
}

export {
    singleContract,
    contractsService
}