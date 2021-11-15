export const SET_WALLET = (pub = undefined, password_hash = undefined, secret = undefined, many_balance = 0, balances, wallet_name = undefined) => {
    return {
        type: "SET_WALLET",
        payload: {
            wallet_name: wallet_name,
            wallet_public: pub,
            wallet_password_hash: password_hash,
            secret: secret,
            many_balances: many_balance,
            balances: balances,
            version: "1.0",
        }
    }
}

export const UPDATE_WALLET_NAME = (name) => {
    return {
        type: "UPDATE_WALLET_NAME",
        payload: {
            name: name,
        }
    }
}
export const REFRESH_WALLET = () => {
    return {
        type: "UPDATE_WALLET_NAME",
    }
}

export const SET_BALANCE = (id, balance_hash, amount_nmc, blockStatus, tag, status, wots_address, many_spent) => {
    return {
        type: "SET_BALANCE",
        payload: {
            id: id,
            status: status,
            balance_hash: balance_hash,
            amount_nmcm: amount_nmc,
            blockStatus: blockStatus,
            tag: tag,
            wots_address: wots_address,
            many_spent: many_spent,
        }
    }
}

export const UPDATE_BALANCE = (id, balance,key,value) => {
    return {
        type: "UPDATE_BALANCE",
        payload: {
            id: id,
            balance: balance,
            key:key,
            value: value,
        }
    }
}

export const DELETE_BALANCE = (id, balance) => {
    return {
        type: "DELETE_BALANCE",
        payload: {
            id: id,
            balance: balance
        }
    }
}
