import {SET_WALLET} from "../actionTypes";

const initialState = {
    password_hash: undefined,
    many_balances: undefined,
    creation_id: undefined,
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

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_WALLET:
            return state
        default:
            return state
    }
}