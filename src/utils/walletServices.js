// import sha256 from 'crypto-js/sha256';
import CryptoJs from "crypto-js";
import {sha256} from "./wots.mjs";
import {wots_public_key_gen} from "./wots.mjs";
var oldhash = require("crypto-js/sha256");

const hash = (value,salt = null)=>{
    return oldhash(value).toString(CryptoJs.enc.Hex).toUpperCase()
}


const xorArray = (seed_bytes, password_bytes) => {
    let encrypted_seed = [];
    for (let iter = 0; iter < 32; iter++) {
        encrypted_seed.push(seed_bytes[iter] ^ password_bytes[iter])
    }
    return encrypted_seed;
}

const getBalance = async (wots) => {
    return await fetch(`http://api.mochimo.org:8888/net/balance/${wots}`).then(res => res)
}

const generateString = (length) => {

    let result = ['0', '2'];
    let hexRef = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    for (let n = 0; n < 22; n++) {
        result.push(hexRef[Math.floor(Math.random() * 16)]);
    }

    return result.join('').toUpperCase()
}
/*
* @NickP55
* */
function generateWots(seed,tag = undefined){
    const private_seed = sha256(seed + "seed")
    const public_seed = sha256(seed + "publ")
    const addresse_seed = sha256(seed + "addr")
    const public_key = wots_public_key_gen(private_seed,public_seed,addresse_seed)
    const wots = [...public_key]
    wots.pushArray(public_seed);
    wots.pushArray(addresse_seed.slice(0, 20));
    console.log(public_key)
    if(tag === undefined || tag.length !== 24) {
        //default tag, cause it is always equal is a waste of resources making a return with it
        wots.pushArray([66,0,0,0,14,0,0,0,1,0,0,0]);
    } else {
        wots.pushArray(tag.hexToByteArray());
    }
    return [wots, private_seed, public_seed, addresse_seed];
}


export {hash, xorArray,generateString, getBalance,generateWots}
