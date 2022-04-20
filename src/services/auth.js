import { BehaviorSubject } from "rxjs";

const auth = new BehaviorSubject(null)
const chain = new BehaviorSubject(null)
const address = new BehaviorSubject(null)
const tokens = new BehaviorSubject(null)
const balance = new BehaviorSubject(null)

const authService = {
    setAuth: function (infos) {
        auth.next(infos)
    },
    setChain: function (chainId) {
        chain.next(chainId)
    },
    setAddress: function (add) {
        address.next(add)
    },
    setTokens: function (tok) {
        tokens.next(tok)
    },
    setBalance: function (bal) {
        balance.next(bal)
    },
    logout: function () {
        auth.next(null)
        address.next(null)
        tokens.next(null)
        balance.next(null)
    },
}

export {
    authService,
    auth,
    address,
    tokens,
    balance,
    chain
}