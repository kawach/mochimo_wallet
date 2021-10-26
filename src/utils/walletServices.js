import sha256 from 'crypto-js/sha256';
import CryptoJs from "crypto-js";

const hash = (value,salt = null)=>{
    return sha256(value + salt).toString(CryptoJs.enc.Hex)
}

export {hash}