export const SET_WALLET = (pub, password_hash) => {
    return {
        type: "SET_WALLET",
        payload: {
            wallet_name: undefined,
            wallet_public: pub,
            wallet_password_hash: password_hash,
            many_balances: 0,
            version: "1.0",
        }
    }
}

export const SET_BALANCE = (id,balance_hash,amount_nmc,blockStatus,tag,wots_address,many_spent) => {
    return {
        type: "SET_BALANCE",
        payload: {
            id: id,
            status: "untagged",
            balance_hash: balance_hash,
            amount_nmcm: amount_nmc,
            blockStatus: blockStatus,
            tag: tag,
            wots_address: wots_address,
            many_spent: many_spent,
        }
    }
}