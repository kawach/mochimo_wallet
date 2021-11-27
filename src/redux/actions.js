export const SET_WALLET = (data) => {
    const {wallet_public, wallet_password_hash, secret, many_balance, balances, wallet_name} = data
    return {
        type: "SET_WALLET",
        payload: {
            wallet_name: wallet_name,
            wallet_public: wallet_public,
            wallet_password_hash: wallet_password_hash,
            secret: secret,
            many_balances: many_balance,
            balances: balances,
            version: "1.1",
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
