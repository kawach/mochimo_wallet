import sha256 from 'crypto-js/sha256';
import CryptoJs from "crypto-js";

const hash = (value,salt = null)=>{
    return sha256(value + salt).toString(CryptoJs.enc.Hex)
}


const xorArray = (seed_bytes, password_bytes) => {
    let encrypted_seed = [];
    for (let iter = 0; iter < 32; iter++) {
        encrypted_seed.push(seed_bytes[iter] ^ password_bytes[iter])
    }
    return encrypted_seed;
}

export {hash, xorArray}
