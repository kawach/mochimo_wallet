// import sha256 from 'crypto-js/sha256';
import CryptoJs from "crypto-js";
import {byte_copy, sha256, from_int_to_byte_array, wots_sign} from "./wots.mjs";
import {wots_public_key_gen} from "./wots.mjs";
var oldhash = require("crypto-js/sha256");

export const foutainWots = async (wots, fountain = "https://wallet.mochimo.com/fund/") => {

    const response = fetch(`${fountain + wots}`)
    console.log(response)
    return fetch(`https://production.dark-bush-c37c.mochimo-wallet.workers.dev/${fountain + wots}`).then(res => res.status === 200 ? (null, console.log(res)):res.json())
}

export const resolveTag = (tag) => {
    return fetch(`https://api.mochimap.com/ledger/tag/${tag}`).then(res => res.json())
}

function bArr_toString(byte_array) {
    var return_str = "";
    for (var i = 0; i < byte_array.length; i++) {
        return_str += String.fromCharCode(byte_array[i]);
    }
    return return_str;
}

const hexToByteArray = function(string) {
    let result = [];
    for (let i = 0; i < string.length; i += 2) {
        result.push(parseInt(string.substr(i, 2), 16));
    }
    return result;
}

export const hash = (value,salt = null)=>{
    return oldhash(value.toString().replaceAll(","," ")).toString(CryptoJs.enc.Hex).toUpperCase()
}


export const xorArray = (seed_bytes, password_bytes) => {
    let encrypted_seed = [];
    for (let iter = 0; iter < 32; iter++) {
        encrypted_seed.push(seed_bytes[iter] ^ password_bytes[iter])
    }
    return encrypted_seed;
}

export const getBalance = async (wots) => {
    return await fetch(`https://api.mochimap.com/ledger/address/${wots}`).then(res => res.json()).then(res => res.balance)
    // return await fetch(`https://api.mochimap.com/ledger/address/${wots}`).then(res => res.json()).then(res => (res.success ? res['quorum'][0].balance : getBalance(wots)))
}

export const getCurrentBlock = async () => {
    // let block = fetch("http://api.mochimo.org:8888/net/chain").then(res=>res.json()).then(({block})=>block.height)
    let block = fetch("https://api.mochimap.com/chain/").then(res=>res.json()).then((block)=>block.bnum)
    return block
}

export const generateString = (length) => {

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
    if(tag === undefined || tag.length !== 24) {
        //default tag, cause it is always equal is a waste of resources making a return with it
        wots.pushArray([66,0,0,0,14,0,0,0,1,0,0,0]);
    } else {
        wots.pushArray(tag.hexToByteArray());
    }
    return [wots, private_seed, public_seed, addresse_seed];
}

function compute_transaction(source_wots, source_secret, change_wots, destination_wots, sent_amount, remaining_amount, fee) {
    //the lenght in bytes the sign message will have is 6456 bytes
    function generate_zeros(how_much) {
        let zeros = [];
        for(let i = 0; i < how_much; i++) {
            zeros.push(0);
        }
        return zeros;
    }
    let message = [];
    /*
    To understand better this message array look at here:
    https://github.com/mochimodev/mochimo/blob/cef95cdea68d12b840ba8631aae5f1312e724093/src/types.h#L72
    */
    message.pushArray(generate_zeros(2)); //things of network etc
    message.pushArray([57,5]);
    message.pushArray(generate_zeros(4)); //things of network etc
    message.pushArray(byte_copy(from_int_to_byte_array(3), 2))
    message.pushArray(generate_zeros(16)); //the two blocks things
    message.pushArray(generate_zeros(32*3)); //block etc hashes and weight
    message.pushArray(generate_zeros(2)); //len..

    if(source_wots.length !== 2208 || change_wots.length !== 2208 || destination_wots.length !== 2208) {
        console.log("the input parameters are wrong")
        console.table({source : source_wots.length,change : change_wots.length, destination : destination_wots.length})
        return false;
    }

    message.pushArray(source_wots);
    message.pushArray(destination_wots);
    message.pushArray(change_wots);
    let send_total = byte_copy(from_int_to_byte_array(sent_amount), 8);
    message.pushArray(send_total);
    let change_total = byte_copy(from_int_to_byte_array(remaining_amount), 8);
    message.pushArray(change_total);
    let tx_fee = byte_copy(from_int_to_byte_array(fee), 8);
    message.pushArray(tx_fee);
    let message_to_sign = message.slice(10+16+32*3+2, 10+16+32*3+2 + 2208*3 + 3*8);
    let hash_message = sha256(message_to_sign.toASCII());
    let pub_seed = source_wots.slice(2144, 2144+32);
    let pub_addr = source_wots.slice(2144 + 32, 2144+64);
    let signature = wots_sign(hash_message, source_secret, pub_seed, pub_addr);
    message.pushArray(signature);
    message.pushArray(generate_zeros(2));
    message.pushArray([205,171]);
    return message;
}

function _arrayBufferToBase64( buffer ) {
    function b2a(a) {
        var c, d, e, f, g, h, i, j, o, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", k = 0, l = 0, m = "", n = [];
        if (!a) return a;
        // eslint-disable-next-line no-unused-expressions
        do c = a.charCodeAt(k++), d = a.charCodeAt(k++), e = a.charCodeAt(k++), j = c << 16 | d << 8 | e,
            f = 63 & j >> 18, g = 63 & j >> 12, h = 63 & j >> 6, i = 63 & j, n[l++] = b.charAt(f) + b.charAt(g) + b.charAt(h) + b.charAt(i);
        while (k < a.length);
        return m = n.join(""), o = a.length % 3, (o ? m.slice(0, o - 3) :m) + "===".slice(o || 3);
    }
    var binary = ''; var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return b2a( binary );
}

export {generateWots, compute_transaction, _arrayBufferToBase64, hexToByteArray,bArr_toString}
