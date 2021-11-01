import {DELETE_BALANCE, SET_BALANCE, SET_WALLET, UPDATE_BALANCE, UPDATE_WALLET_NAME, UPDATE_WALLET} from "../actionTypes";
import {getBalance} from "../../utils/walletServices";

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
            // current['balances'][action.payload.id]
            return {...state}
        }
        case SET_BALANCE: {
            return {
                ...state, many_balances: state.many_balances + 1, balances: {
                    ...state.balances,
                    [state.many_balances]: action.payload
                }
            }
        }
        case UPDATE_WALLET:{
            return {...state}
        }
        case UPDATE_BALANCE: {
            let {balances} = state
            balances[action.payload.id][action.payload.key] = action.payload.value
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