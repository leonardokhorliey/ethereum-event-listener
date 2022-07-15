// import { CONTRACT_ABI } from "./constants";
// import { contactAddress } from "./constants";

const ethers = require("ethers");
const axios = require("axios");

require("dotenv").config();

const INFURA = process.env.INFURA_ID;
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const EVENT_NAME = process.env.EVENT_NAME;
const etherscanApiUrl= `http://api.etherscan.io/api?module=contract&action=getabi&address=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_KEY}`

console.log(INFURA);

async function getAbi() {
    let result= await axios.get(etherscanApiUrl);

    return JSON.parse(result.data.result);
}


async function main() {

    const abi = await getAbi();

    console.log(abi);

    const provider = new ethers.providers.StaticJsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA}`);

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

    contract.on(EVENT_NAME, (from, to, value) => {
        let info = {from, to, value: ethers.utils.formatUnits(value, 6)};

        console.log(info)
    })
}

main();