import {SET_WALLET, UPDATE_BALANCE,SET_BALANCE} from "../actionTypes";
import _ from "lodash";

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
        case SET_BALANCE:
            return {
                ...state, many_balances: state.many_balances + 1, balances: {
                    ...state.balances,
                    [state.many_balances]: action.payload
                }
            }
        case UPDATE_BALANCE:
            let current = {...state}
            console.log(current,action)
            console.log(_.keys(state.balances))
            delete current['balances'][action.payload.id]
            return {...state}
        default:
            return null
    }
}