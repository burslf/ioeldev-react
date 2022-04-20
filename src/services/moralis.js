
const getUserTokens = async (Web3Api, address, chain) => {
    const tokens = await Web3Api.account.getTokenBalances({
        address,
        chain,
    })
    return tokens
}

const getUserBalance = async(Web3Api, address, chain) => {
    const balance = await Web3Api.account.getNativeBalance({
        address,
        chain
    })
    const toDecimal = parseInt(balance.balance) / (10**18)
    return toDecimal
}


export {
    getUserTokens,
    getUserBalance
}