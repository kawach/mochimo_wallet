export const SET_WALLET = (name,encryptedSeed,checkPassord) => {
    return {
        type: SET_WALLET,
        payload: {
            name: name,
            encryptedSeed: encryptedSeed,
            check_password: checkPassord,
            version: "1.0",

        }
    }
}
