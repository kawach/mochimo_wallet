import {DELETE_BALANCE, SET_BALANCE, SET_WALLET, UPDATE_BALANCE, UPDATE_WALLET_NAME, UPDATE_WALLET, UPDATE_WALLET_PASSWORD} from "../actionTypes";
import {toast} from "react-toastify";

const initialState = {
    password_hash: undefined,
    many_balances: undefined,
    red: undefined,
    green: undefined,
    blue: undefined,
    wallet_name: undefined,
    gift_cards: undefined,
    mnemonic_hash: undefined,
    settings: {
        many_resolve_nodes: undefined,
        allow_biometrics: undefined,
        many_balance_quorum: undefined,
        many_resolve_quorum: undefined,
        allow_notifications: undefined,
        many_balance_nodes: undefined,
        many_send_tx_nodes: undefined
    },
    balances: [
        {
            id: undefined,
            status: undefined,
            balance_hash: undefined,
            amount_nmcm: undefined,
            blockStatus: undefined,
            tag: undefined,
            wots_address: undefined,
            many_spent: undefined,
        }
    ]
}

export default function Store(state = initialState, action) {
    switch (action.type) {
        case SET_WALLET:
            return action.payload
        case UPDATE_WALLET_NAME: {
            let current = {...state}
            current['wallet_name'] = action.payload.name
            return current
        }
        case UPDATE_WALLET_PASSWORD:{
            let current = {...state}
            current['wallet_password_hash'] = action.payload.wallet_password_hash
            return current
        }
        case SET_BALANCE: {
            return {
                ...state, many_balances: action.payload.many_balances, balances: {
                    ...state.balances,
                    [action.payload.id]: {
                        id: action.payload.id,
                        status: action.payload.status,
                        balance_hash: action.payload.balance_hash,
                        amount_nmcm: action.payload.amount_nmcm,
                        blockStatus: action.payload.blockStatus,
                        tag: action.payload.tag,
                        wots_address: action.payload.wots_address,
                        many_spent: action.payload.many_spent,
                    }
                }
            }
        }
        case UPDATE_WALLET:{
            return {...state}
        }
        case UPDATE_BALANCE: {
            toast.success(`Balance : ${action.payload.id}, Key : ${action.payload.key} updated`)
            let current = {...state}
            console.log(current.balances)
            current['balances'][action.payload.id][action.payload.key] = action.payload.value
            return {...state}
        }
        case DELETE_BALANCE: {
            let current = {...state}
            delete current['balances'][action.payload.id]
            return {...state}
        }
        default:
            return null
    }
}