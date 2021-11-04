var axios = require("axios");
var faker = require("faker");
var fs = require("fs");
var moment = require("moment")

const workMetadata = require("./work.json");
const mainMetadata = require("./main.json");
const argonToken = require("./argonToken.json");



const HDWalletProvider = require("@truffle/hdwallet-provider");
const privkey = "";
const ARGON_CONTRACT_ADDRESS = "0x851f7a700c5d67db59612b871338a85526752c25";
const ARGON_ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "_decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "_symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "mint",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const provider = new HDWalletProvider(
  privkey,
  "https://bsc-dataseed.binance.org/"
);

const countries = require("./countries.json");
const Web3 = require("web3");
const web3 = new Web3(provider);
const CONTRACT_ADDRESS = "0xD0253f6ea6Cdb467066eC3e360D1a549af5cCDC6";
//main 0xD0253f6ea6Cdb467066eC3e360D1a549af5cCDC6
//test 0x69491Ce484F27D39ECf70418f6AE85ebC0316f13
let main = new web3.eth.Contract(
  JSON.parse(mainMetadata.interface),
  CONTRACT_ADDRESS
);

const split = "==!@!==";
async function getPersonData(address) {
  const allPersonData = await main.methods.getPersonInfoData(address).call();
  var splittedData = allPersonData[4].split(split);
  var personObj = {
    personNameSurname: splittedData[0],
    personMailAddress: splittedData[1],
    personLang: splittedData[2],
    personCategory: splittedData[3],
    personTelegramID: splittedData[4],
    personPortfoyLink: splittedData[5],
    personPP: splittedData[6],
    personResume: splittedData[7],
    personPhoneNumber: splittedData[8],
    personSkills: splittedData[9],
    personCV: splittedData[10],
    personAccountType: allPersonData[0],
    personWorkCount: allPersonData[1],
    personPuan: allPersonData[2],
    personWorkAddresses: allPersonData[3],
    personHourlyPrice: splittedData[11],
  };
  return personObj;
}

function setPersonData(
  personNameSurname,
  personMailAddress,
  personLang,
  personCategory,
  personTelegramID,
  personPortfoyLink,
  personPP,
  personResume,
  personPhoneNumber,
  personSkills,
  personCV,
  personHourlyPrice
) {
  const data =
    personNameSurname +
    split +
    personMailAddress +
    split +
    personLang +
    split +
    personCategory +
    split +
    personTelegramID +
    split +
    personPortfoyLink +
    split +
    personPP +
    split +
    personResume +
    split +
    personPhoneNumber +
    split +
    personSkills +
    split +
    personCV +
    split +
    personHourlyPrice;
  return data;
}
getCountryName = (code) => {
  for (let i = 0; i < countries.length; i++) {
    if (countries[i].code == code) {
      return countries[i].name;
    }
  }
};
async function createEmployerAccount(count, country) {
  fs.readFile("addresses.json", async (err, data) => {
    const length = country.length;
    let arr = JSON.parse(data);

    for (let i = 0; i < count; i++) {
      const min = Math.ceil(0);
      const max = Math.floor(length);
      const randomResult = Math.floor(Math.random() * (max - min) + min);
      const selectedCountry = country[randomResult];
      let selectedCountryName = getCountryName(selectedCountry);
      const minHour = Math.ceil(5);
      const maxHour = Math.floor(70);
      const randomHour = Math.floor(
        Math.random() * (maxHour - minHour) + minHour
      );

      faker.locale = selectedCountry.toLowerCase();
      var randomCard = faker.helpers.createCard(); // random contact card containing many properties

  
      const personInfoData = setPersonData(
        randomCard.name,
        randomCard.email,
        selectedCountryName,
        "undefined",
        "undefined",
        "undefined",
        "undefined",
        "Resume",
        randomCard.phone,
        "skills",
        "undefined",
        randomHour + " USD"
      );

      const newAccount = web3.eth.accounts.create(web3.utils.randomHex(32));
      const address = {
        address: newAccount.address,
        privKey: newAccount.privateKey,
      };
      await sendBNBOneWallet(address.address, "0.1");
      const gasLimit = await main.methods
        .addPerson("2", personInfoData)
        .estimateGas({ from: address.address });
      var tx = {
        from: address.address,
        to: CONTRACT_ADDRESS,
        gas: web3.utils.toHex(gasLimit),
        data: main.methods.addPerson("2", personInfoData).encodeABI(),
      };
      const signPromise = web3.eth.accounts
        .signTransaction(tx, address.privKey)
        .then((signedTx) => {
          const sentTx = web3.eth.sendSignedTransaction(
            signedTx.raw || signedTx.rawTransaction
          );
          sentTx.on("receipt", (receipt) => {
            console.log("ACCOUNT CREATED : " + address.address);
          });
          sentTx.on("error", (err) => {
            console.log(err, "error");
          });
        });
      arr[0].employerAddresses.push(address);
      const jsonEmployerData = {
        [address.address]: {
          privKey: address.privKey,
          address: address.address,
          workAddresses: [],
        },
      };
      arr[0].employerDatas.push(jsonEmployerData);
    }


    fs.writeFile("addresses.json", JSON.stringify(arr), function (err) {});
  });
}
async function createFreelancerAccount(count, country) {
  fs.readFile("addresses.json", async (err, data) => {
    const length = country.length;
    let arr = JSON.parse(data);

    for (let i = 0; i < count; i++) {
      const min = Math.ceil(0);
      const max = Math.floor(length);
      const randomResult = Math.floor(Math.random() * (max - min) + min);
      const selectedCountry = country[randomResult];
      let selectedCountryName = getCountryName(selectedCountry);
      const minHour = Math.ceil(5);
      const maxHour = Math.floor(70);
      const randomHour = Math.floor(
        Math.random() * (maxHour - minHour) + minHour
      );
      faker.locale = selectedCountry.toLowerCase();
      var randomCard = faker.helpers.createCard(); // random contact card containing many properties
      const personInfoData = setPersonData(
        randomCard.name,
        randomCard.email,
        selectedCountryName,
        "undefined",
        "undefined",
        "undefined",
        "undefined",
        "Resume",
        randomCard.phone,
        "skills",
        "undefined",
        randomHour + " USD"
      );

      const newAccount = web3.eth.accounts.create(web3.utils.randomHex(32));
      const address = {
        address: newAccount.address,
        privKey: newAccount.privateKey,
      };
      await sendBNBOneWallet(address.address, "0.003");
      const gasLimit = await main.methods
        .addPerson("0", personInfoData)
        .estimateGas({ from: address.address });
      var tx = {
        from: address.address,
        to: CONTRACT_ADDRESS,
        gas: web3.utils.toHex(gasLimit),
        data: main.methods.addPerson("0", personInfoData).encodeABI(),
      };
      const signPromise = web3.eth.accounts
        .signTransaction(tx, address.privKey)
        .then((signedTx) => {
          const sentTx = web3.eth.sendSignedTransaction(
            signedTx.raw || signedTx.rawTransaction
          );
          sentTx.on("receipt", (receipt) => {
            console.log("ACCOUNT CREATED : " + address.address);
          });
          sentTx.on("error", (err) => {
            console.log(err, "error");
          });
        });
      arr[0].freelancerAddresses.push(address);
      const jsonEmployerData = {
        [address.address]: {
          privKey: address.privKey,
          offered: [],
        },
      };
      arr[0].freelancerDatas.push(jsonEmployerData);
    }


    fs.writeFile("addresses.json", JSON.stringify(arr), function (err) {});
  });
}

async function createWork(min, max) {

  fs.readFile("addresses.json", async (err, data) => {
    const arr = JSON.parse(data);


      try {

    for (let i = min; i <= max; i++) {
     // await  //1 dakika 60 saniye
      const employerAddress = arr[0].employerAddresses[i];
      const address = employerAddress.address;
      const lastWork = arr[0].worksWillCreate[arr[0].worksWillCreate.length - 1]
      arr[0].worksWillCreate.pop()

     
      //test https://api.telegram.org/botbot1883908439:AAEuWyfLtMbSz9WytrbZ8VdlBnzYQUc1KEA/sendMessage?chat_id=-568601381&text=New Job Created                                                                                                                                                                                                                             <strong>Title:</strong> ${headline}                                                                                                                                                                                                                                                <strong>Description:</strong>  ${description > 300 ? description.slice(0,300)+ "..." : description}                                                                                                                                                                                                                                                                 <strong>Budget:</strong> <strong>${budget}</strong>                                                                                                                                                                                                                                                                 <strong>Employer Address:</strong> ${employerAddress.address}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <a href="https://www.argon.run/jobs/">Check out the jobs</a>                                        &parse_mode=HTML
      //prod https://api.telegram.org/bot1809803661:AAEycaIwdsncs7NP7xWH35XUlFvIDIIeRP4/sendMessage?chat_id=@argonjobs_feed&text=New Job Created  
 
     
      var descForTelegram = await lastWork.workDescription.split("!!=@=!!");

      const gasLimit = await main.methods
        .createWork(lastWork.workTitle, "Freelancer" ,lastWork.workDescription, lastWork.workAvarageBudget)
        .estimateGas({ from: employerAddress.address });
      var tx = {
        from: employerAddress.address,
        to: CONTRACT_ADDRESS,
        gas: web3.utils.toHex(gasLimit),
        data: main.methods
          .createWork(lastWork.workTitle, "Freelancer" ,lastWork.workDescription, lastWork.workAvarageBudget)
          .encodeABI(),
      };
     
      const signPromise = web3.eth.accounts
        .signTransaction(tx, employerAddress.privKey)
        .then((signedTx) => {
          const sentTx = web3.eth.sendSignedTransaction(
            signedTx.raw || signedTx.rawTransaction
          );
          sentTx.on("receipt", async (receipt) => {
            const createdWork = await getTxData(signedTx.transactionHash);
            arr[0].works.push({
              address: createdWork,
            });
            console.log("WORK CREATED: " + createdWork);
            
            var url = 'https://api.telegram.org/bot1809803661:AAEycaIwdsncs7NP7xWH35XUlFvIDIIeRP4/sendMessage?chat_id=@argonjobs_feed&text=New Job Created                                                                                                                                                                                                                             <strong>Title:</strong>'+lastWork.workTitle+'                                                                                                                                                                                                                                                <strong>Description:</strong>'+descForTelegram[0]+'                                                                                                                                                                                                                                                                <strong>Budget:</strong> <strong>'+lastWork.workAvarageBudget+'</strong>                                                                                                                                                                                                                                                                <strong>Employer Address:</strong>'+employerAddress.address+'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               <a href="https://www.argon.run/jobs/">Check out the jobs</a>                                        &parse_mode=HTML';
           await axios.post(url)

            for (let i = 0; i < arr[0].employerDatas.length; i++) {
              if (arr[0].employerDatas[i][address]) {
                arr[0].employerDatas[i][address].workAddresses.push(
                  createdWork
                );
                const min = Math.ceil(200);
                const max = Math.floor(10000);
                const randomResult = Math.floor(
                  Math.random() * (max - min) + min
                );
                const workDetails = {
                  [createdWork]: {
                    employer: employerAddress.address,
                    freelancer: "0x0000000000000000000000000000000000000000",
                    status: false,
                    workPrice: web3.utils.toWei(String(randomResult), "ether"),
                  },
                };
                console.log(workDetails);
                arr[0].worksDetails.push(workDetails);
                
                fs.writeFile(
                  "addresses.json",
                  JSON.stringify(arr),
                  function (err) {}
                );
              }
            }
          });
          sentTx.on("error", (err) => {
            console.log(err, "error");
          });
        });

    }
  } catch (error) {
        console.log(error)
  }
  });

  
}

async function createOffers(min, max) {
  fs.readFile("addresses.json", async (err, data) => {
    let arr = JSON.parse(data);
    let works = arr[0].works;
    const _freelancerAddresses = arr[0].freelancerAddresses;
    const _freelancerDatas = arr[0].freelancerDatas;
    try {
    let emptyWorks = [];
    let emptyFreelancers = [];
    let emptyFreelancersPrivkey = [];
    let nonEmptyFreelancers = [];
    let nonEmptyFreelancersPrivkey = [];
    for (let x = min; x <= max; x++) {
        nonEmptyFreelancers.push(_freelancerAddresses[x].address)
        nonEmptyFreelancersPrivkey.push(_freelancerAddresses[x].privKey)
      if(_freelancerDatas[x][_freelancerAddresses[x].address].offered.length == 0){
        emptyFreelancers.push(_freelancerAddresses[x].address)
        emptyFreelancersPrivkey.push(_freelancerAddresses[x].privKey)
      }
    }

    for (let y = 0; y < works.length; y++) {
      if(arr[0].worksDetails[y][works[y].address].freelancer == "0x0000000000000000000000000000000000000000"){
        emptyWorks.push(works[y].address)
      }
    }

   


if(emptyWorks.length > emptyFreelancers.length){
  emptyFreelancers = nonEmptyFreelancers
  emptyFreelancersPrivkey = nonEmptyFreelancersPrivkey
  }
  

if(emptyFreelancers){
    for (let l = 0; l < emptyWorks.length; l++) {
    
      let work = await new web3.eth.Contract(
        JSON.parse(workMetadata.interface),
        emptyWorks[l]
      );
//hata
      var workPrice = arr[0].worksDetails[l][emptyWorks[l]].workPrice
      var freelancerAddress = emptyFreelancers[l]
      var freelancerPrivKey = emptyFreelancersPrivkey[l]
      arr[0].worksDetails[l][emptyWorks[l]].freelancer = freelancerAddress
      arr[0].freelancerDatas[l][emptyFreelancers[l]].offered.push(emptyWorks[l])

      let deadline = Date.now() + 86400 * 5000
      const gasLimit = await work.methods
      .createOffer(workPrice, "desc", deadline, "title here", ARGON_CONTRACT_ADDRESS, false, false)
      .estimateGas({ from: freelancerAddress });
    
        //gas: web3.utils.toHex(gasLimit),
      var tx = await {
      from: freelancerAddress,
      to: emptyWorks[l],
      gas: gasLimit,
      data: work.methods
        .createOffer(workPrice, "desc", deadline, "title here", ARGON_CONTRACT_ADDRESS, false, false)
        .encodeABI(),
     };
   
    const signPromise = await web3.eth.accounts
      .signTransaction(tx, freelancerPrivKey)
      .then((signedTx) => {
        const sentTx =  web3.eth.sendSignedTransaction(
          signedTx.raw || signedTx.rawTransaction
        );
         sentTx.on("receipt", async (receipt) => {
           console.log("OFFER SUCCESSFULY CREATED FOR " + emptyWorks[l])

        fs.writeFile(
          "addresses.json",
          JSON.stringify(arr),
          function (err) {}
        );
          });
         sentTx.on("error", (err) => {
          console.log(err, "error");
        });

      })


  }

}} catch (error) {
console.log(error)
}


  });
  

}

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

async function acceptOfferAllowence(min, max){

  let instance = new web3.eth.Contract(
    JSON.parse(argonToken.interface),
    ARGON_CONTRACT_ADDRESS
  );

  fs.readFile("addresses.json", async (err, data) => {
    let arr = JSON.parse(data);
    let allWorks = arr[0].works;
    let allWorksUser = [];
    let works = []
    let employers = []
    let employerPrivKeys = []
    let freelancers = []
    let workPrices = []

    var allEmployers = arr[0].employerAddresses

    for (let index = min; index <= max; index++) {
      allWorksUser.push(allWorks[index].address)
    }

    
    for (let g = 0; g < allWorks.length; g++) {
      for (let z = 0; z < allWorksUser.length; z++) {
        if(arr[0].worksDetails[g][allWorksUser[z]] != undefined && arr[0].worksDetails[g][allWorksUser[z]].freelancer != "0x0000000000000000000000000000000000000000" && arr[0].worksDetails[g][allWorksUser[z]].status === false){
          works.push(allWorksUser[z])
          employers.push(arr[0].worksDetails[g][allWorksUser[z]].employer)
          freelancers.push(arr[0].worksDetails[g][allWorksUser[z]].freelancer)
          workPrices.push(arr[0].worksDetails[g][allWorksUser[z]].workPrice)


        }
      }
    }
      for (let i = 0; i < employers.length; i++) {
          for (let j = 0; j < allEmployers.length; j++) {
              if(allEmployers[j].address == employers[i]) {
                employerPrivKeys.push(allEmployers[j].privKey)
              }        
          }        
      }
      


     // console.log("EMPLOYER ====>", employers)
     // console.log("EMPLOYER PRIV ====>", employerPrivKeys)
     // console.log("WORKS ====>", works)
     // console.log("FREELANCER ====>", freelancers)

    
        for (let index = 0; index < freelancers.length; index++) {
          await wait(5000);

try {
  

      let work = await new web3.eth.Contract(
        JSON.parse(workMetadata.interface),
        works[index]
      );

      var freelancerAddress = freelancers[index]
      var employerAddress = employers[index]
      var employerPrivKey = employerPrivKeys[index]
      
      console.log("STARTING PROCESS FOR:" + employerAddress)

      for (let g = 0; g < works.length; g++) {
        for (let z = 0; z < arr[0].worksDetails.length; z++) {
          if(arr[0].worksDetails[z][works[g]] != undefined && arr[0].worksDetails[z][works[g]].status === false){
            arr[0].worksDetails[z][works[g]].status = true
          }
        }
      }
      console.log(workPrices[index])

      const gasLimitTokenApprove = await instance.methods.approve(employerAddress, "100000000000000000000000")
      .estimateGas({ from: employerAddress });
    

      var txTokenApprove = await {
      from: employerAddress,
      to: ARGON_CONTRACT_ADDRESS,
      gas: web3.utils.toHex(65320),
      data: instance.methods.approve(works[index], workPrices[index]).encodeABI(),
     };
     await wait(10000);

     const signPromise = await web3.eth.accounts
     .signTransaction(txTokenApprove, employerPrivKey)
     .then(async(signedTx) => {
      await wait(10000);
      const sentTx =  web3.eth.sendSignedTransaction(
         signedTx.raw || signedTx.rawTransaction
       );
        sentTx.on("receipt", async (receipt) => {
          console.log("Token Approve Successful ")
         });
        sentTx.on("error", (err) => {
         console.log(err, "error");
       });
     

      })


   

      } catch (error) {
        console.log(error)
      }
        }
    

 
  });

}

async function acceptOffer(min, max){

  let instance = new web3.eth.Contract(
    JSON.parse(argonToken.interface),
    ARGON_CONTRACT_ADDRESS
  );

  fs.readFile("addresses.json", async (err, data) => {
    let arr = JSON.parse(data);
    let allWorks = arr[0].works;
    let allWorksUser = [];
    let works = []
    let employers = []
    let employerPrivKeys = []
    let freelancers = []
    let workPrices = []

    var allEmployers = arr[0].employerAddresses

    for (let index = min; index <= max; index++) {
      allWorksUser.push(allWorks[index].address)
    }

    
    for (let g = 0; g < allWorks.length; g++) {
      for (let z = 0; z < allWorksUser.length; z++) {
        if(arr[0].worksDetails[g][allWorksUser[z]] != undefined && arr[0].worksDetails[g][allWorksUser[z]].freelancer != "0x0000000000000000000000000000000000000000" && arr[0].worksDetails[g][allWorksUser[z]].status === false){
          works.push(allWorksUser[z])
          employers.push(arr[0].worksDetails[g][allWorksUser[z]].employer)
          freelancers.push(arr[0].worksDetails[g][allWorksUser[z]].freelancer)
          workPrices.push(arr[0].worksDetails[g][allWorksUser[z]].workPrice)


        }
      }
    }
      for (let i = 0; i < employers.length; i++) {
          for (let j = 0; j < allEmployers.length; j++) {
              if(allEmployers[j].address == employers[i]) {
                employerPrivKeys.push(allEmployers[j].privKey)
              }        
          }        
      }
      
     // console.log("EMPLOYER ====>", employers)
     // console.log("EMPLOYER PRIV ====>", employerPrivKeys)
     // console.log("WORKS ====>", works)
     // console.log("FREELANCER ====>", freelancers)

    
        for (let index = 0; index < freelancers.length; index++) {
          await wait(5000);

try {
  

      let work = await new web3.eth.Contract(
        JSON.parse(workMetadata.interface),
        works[index]
      );

      var freelancerAddress = freelancers[index]
      var employerAddress = employers[index]
      var employerPrivKey = employerPrivKeys[index]
      
      console.log("STARTING PROCESS FOR:" + employerAddress)

      for (let g = 0; g < works.length; g++) {
        for (let z = 0; z < arr[0].worksDetails.length; z++) {
          if(arr[0].worksDetails[z][works[g]] != undefined && arr[0].worksDetails[z][works[g]].status === false){
            arr[0].worksDetails[z][works[g]].status = true
          }
        }
      }

      const gasLimit = await work.methods
      .selectOfferWithToken(freelancerAddress, "0x0000000000000000000000000000000000000000")
      .estimateGas({ from: employerAddress });
    

      var tx = await {
      from: employerAddress,
      to: works[index],
      gas: web3.utils.toHex(gasLimit),
      data: work.methods
        .selectOfferWithToken(freelancerAddress, "0x0000000000000000000000000000000000000000")
        .encodeABI(),
     };
     await wait(10000);
   
    const signPromise2 = await web3.eth.accounts
      .signTransaction(tx, employerPrivKey)
      .then(async(signedTx2) => {
      await wait(10000);
        const sentTx =  web3.eth.sendSignedTransaction(
          signedTx2.raw || signedTx2.rawTransaction
        );
         sentTx.on("receipt", async (receipt) => {
           console.log("OFFERS SUCCESSFULLY SELECTED " + works[index])

        fs.writeFile(
          "addresses.json",
          JSON.stringify(arr),
          function (err) {}
        );
          });
         sentTx.on("error", (err) => {
          console.log(err, "error");
        });

      })

      } catch (error) {
        console.log(error)
      }

        }
    
 
  });

}


async function sendFiles(min, max){
  fs.readFile("addresses.json", async (err, data) => {
    let arr = JSON.parse(data);
    let allWorks = arr[0].works;
    let allWorksDetails = arr[0].worksDetails;
    let works = [];
    let freelancers = [];
    let freelancerPrivKeys = [];
    let realWorks = [];
    let allFreelancers = arr[0].freelancerAddresses


    for (let index = min; index <= max; index++) {
        works.push(allWorks[index].address)
    }

if(works.length > 0){
    for (let z = 0; z < works.length; z++) {
      for (let j = 0; j < arr[0].worksDetails.length; j++) {
        if(arr[0].worksDetails[j][works[z]] != undefined && arr[0].worksDetails[j][works[z]].status == true){
          realWorks.push(works[z])
          freelancers.push(arr[0].worksDetails[j][works[z]].freelancer)
        }
      }      
    }
  }


  for (let i = 0; i < freelancers.length; i++) {
    for (let j = 0; j < allFreelancers.length; j++) {
        if(allFreelancers[j].address == freelancers[i]) {
          freelancerPrivKeys.push(allFreelancers[j].privKey)
        }        
    }        
}


for (let index = 0; index < freelancers.length; index++) {

try {

let work = await new web3.eth.Contract(
JSON.parse(workMetadata.interface),
realWorks[index]
);

var freelancerAddress = freelancers[index]
var freelancerPrivKey = freelancerPrivKeys[index]
console.log(freelancerAddress)
console.log(freelancerPrivKey)
console.log("STARTING PROCESS FOR:" + realWorks[index])



const gasLimit = await work.methods
.freelancerSendFile("https://drive.google.com/drive/u/0/folders/1ClU0Pi7pW-JmwdQ4esX8MqprBWA3kW9n")
.estimateGas({ from: freelancerAddress });


var tx = await {
from: freelancerAddress,
to: realWorks[index],
gas: web3.utils.toHex(gasLimit),
data: work.methods
.freelancerSendFile("https://drive.google.com/drive/u/0/folders/1ClU0Pi7pW-JmwdQ4esX8MqprBWA3kW9n")
.encodeABI(),
};
await wait(10000);

const signPromise2 = await web3.eth.accounts
.signTransaction(tx, freelancerPrivKey)
.then(async(signedTx2) => {
await wait(10000);
const sentTx =  web3.eth.sendSignedTransaction(
  signedTx2.raw || signedTx2.rawTransaction
);
 sentTx.on("receipt", async (receipt) => {
   console.log("FILES SUCCESSFULLY SENT " + realWorks[index])
  });
 sentTx.on("error", (err) => {
  console.log(err, "error");
});

})

} catch (error) {
console.log(error)
}

}




  });
}


async function acceptFiles(min, max){
  fs.readFile("addresses.json", async (err, data) => {
    let arr = JSON.parse(data);
    let allWorks = arr[0].works;
    let allWorksUser = [];
    let works = []
    let employers = []
    let employerPrivKeys = []

    var allEmployers = arr[0].employerAddresses

    for (let index = min; index <= max; index++) {
      allWorksUser.push(allWorks[index].address)
    }
    for (let g = 0; g < allWorks.length; g++) {
      for (let z = 0; z < allWorksUser.length; z++) {
        if(arr[0].worksDetails[g][allWorksUser[z]] != undefined && arr[0].worksDetails[g][allWorksUser[z]].freelancer != "0x0000000000000000000000000000000000000000" && arr[0].worksDetails[g][allWorksUser[z]].status === true){
          works.push(allWorksUser[z])
          employers.push(arr[0].worksDetails[g][allWorksUser[z]].employer)
        }
      }
    }
    for (let i = 0; i < employers.length; i++) {
          for (let j = 0; j < allEmployers.length; j++) {
              if(allEmployers[j].address == employers[i]) {
                employerPrivKeys.push(allEmployers[j].privKey)
              }        
          }        
      }
  


for (let index = 0; index < employers.length; index++) {


  try {
  
  let work = await new web3.eth.Contract(
  JSON.parse(workMetadata.interface),
  works[index]
  );
  
  var employerAddress = employers[index]
  var employerPrivKey = employerPrivKeys[index]


  const min = Math.ceil(1);
  const max = Math.floor(6);
  const randomResult = Math.floor(
    Math.random() * (max - min) + min
  );

  if(randomResult >= 3){
   var comments = arr[0].goodCommentsFiles
  }else{
   var comments = arr[0].badCommentsFiles
  }

  for (let b = 0; b < comments.length; b++) {
    var comment = comments[b].comment;

  }
 
  const gasLimit = await work.methods
  .employerReceiveFile(randomResult, comment)
  .estimateGas({ from: employerAddress });
  
  
  var tx = await {
  from: employerAddress,
  to: works[index],
  gas: web3.utils.toHex(gasLimit),
  data: work.methods
  .employerReceiveFile(randomResult, comment)
  .encodeABI(),
  };
  await wait(10000);
  
  const signPromise2 = await web3.eth.accounts
  .signTransaction(tx, employerPrivKey)
  .then(async(signedTx2) => {
  await wait(10000);
  const sentTx =  web3.eth.sendSignedTransaction(
    signedTx2.raw || signedTx2.rawTransaction
  );
   sentTx.on("receipt", async (receipt) => {
     console.log("FILES SUCCESSFULLY ACCEPTED MONEY TRANSFERED " + works[index])
    });
   sentTx.on("error", (err) => {
    console.log(err, "error");
  });
  
  })
  
  } catch (error) {
  console.log(error)
  }
  
  }
  
  


  })
}


getTxData = async (hash) => {
  const txData = await web3.eth.getTransactionReceipt(hash);
  if (Boolean(txData.logs[0].address)) {
    return txData.logs[0].address;
  } else {
    return false;
  }
};
getWallets = async (who) => {
  const data = fs.readFileSync("addresses.json", "utf-8");
  const arr = JSON.parse(data)
  if(who == "freelancer"){
  return arr[0].freelancerAddresses
  }else{
  return arr[0].employerAddresses
  }
};
createFake = async (accounts) => {
  const feeAddress = await main.methods.bnbFeeRate().call();
  console.log(wallets);
};

sendBNBOneWallet = async (wallet, _amount) => {
  try {
    const amount = web3.utils.toWei(_amount, "ether");
    const oldAmount = await web3.eth.getBalance(wallet);
    const accounts = await web3.eth.getAccounts();
    await web3.eth.sendTransaction({
      from: accounts[0],
      to: wallet,
      value: amount,
    });
    const newBalance = await web3.eth.getBalance(wallet);
    return true;
  } catch (err) {
    return false;
  }
};
sendArgonToEmployers = async (min, max) => {
  let instance = new web3.eth.Contract(
    JSON.parse(argonToken.interface),
    ARGON_CONTRACT_ADDRESS
  );

  const privkeyEmployer = await "3647e4d9aa6a5bcca05b841b1d86616f69713b42ca346b979f889252d946e3b5";
  const provider = await new HDWalletProvider(
    privkeyEmployer,
    "https://bsc-dataseed.binance.org/"
  );
  const web3Employer = await new Web3(provider);
  const accounts = await web3Employer.eth.getAccounts();
  fs.readFile("addresses.json", async (err, data) => {
    let arr = JSON.parse(data);

    let allWorksUser = [];
    let employers = []
    let workPrices = []
    let allWorks = arr[0].works;

    for (let index = min; index <= max; index++) {
      allWorksUser.push(allWorks[index].address)
    }

    
    for (let g = 0; g < allWorks.length; g++) {
      for (let z = 0; z < allWorksUser.length; z++) {
        if(arr[0].worksDetails[g][allWorksUser[z]] != undefined && arr[0].worksDetails[g][allWorksUser[z]].freelancer != "0x0000000000000000000000000000000000000000" && arr[0].worksDetails[g][allWorksUser[z]].status === false){
          employers.push(arr[0].worksDetails[g][allWorksUser[z]].employer)
          workPrices.push(arr[0].worksDetails[g][allWorksUser[z]].workPrice)
        }
      }
    }

    console.log("EMPLOYERS",employers)
    console.log("WORK PRICES",workPrices)

    
    for (let index = 0; index < employers.length; index++) {

        const amount = await workPrices[index]
        const gasLimit = await instance.methods
        .transfer(employers[index], amount)
        .estimateGas({ from: accounts[0] });
      
        var tx = await {
        from: accounts[0],
        to: ARGON_CONTRACT_ADDRESS,
        gas: web3.utils.toHex(gasLimit),
        data: instance.methods
        .transfer(employers[index], amount)
        .encodeABI(),
        };

        console.log("TX",tx)
        console.log("GAS LIMIT",gasLimit)
        console.log("AMOUNT",amount)

        await wait(10000);

        const signPromise2 = await web3.eth.accounts
        .signTransaction(tx, privkeyEmployer)
        .then(async(signedTx2) => {
        await wait(10000);
        const sentTx =  web3.eth.sendSignedTransaction(
          signedTx2.raw || signedTx2.rawTransaction
        );
        sentTx.on("receipt",  (receipt) => {
          console.log("ARGONs TRANSFERED TO" + employers[index])
          });
        sentTx.on("error", (err) => {
          console.log(err, "error");
        });
        
        })
        
      }

    });
  
}

getEvents = async () => {
  argon
    .getPastEvents("Transfer", {
      fromBlock: 0,
      toBlock: "latest", // You can also specify 'latest'
    })
    .then((events) => console.log(events.length))
    .catch((err) => console.error(err));
};





getArgonOneAddress = async (to) => {
  fs.readFile("addresses.json", async (err, data) => {
    let arr = JSON.parse(data);
    const allFreelancers = arr[0].freelancerAddresses;
    for (let i = 0; i < arr[0].freelancerAddresses.length; i++) {
      const address = allFreelancers[i].address;
      const privatekey = allFreelancers[i].privKey;
      const balance = await argon.methods
        .balanceOf(allFreelancers[i].address)
        .call();
      if (balance > 0) {
        const gasLimit = await argon.methods
          .transfer(to, balance)
          .estimateGas({ from: address });

        var tx = await {
          from: address,
          to: ARGON_CONTRACT_ADDRESS,
          gas: web3.utils.toHex(gasLimit),
          data: argon.methods.transfer(to, balance).encodeABI(),
        };
        await wait(10000);

        const signPromise2 = await web3.eth.accounts
          .signTransaction(tx, privatekey)
          .then(async (signedTx2) => {
            await wait(10000);
            const sentTx = web3.eth.sendSignedTransaction(
              signedTx2.raw || signedTx2.rawTransaction
            );
            sentTx.on("receipt", async (receipt) => {
              console.log("TOKENS TRANSFERED FROM " + address);
            });
            sentTx.on("error", (err) => {
              console.log(err, "error");
            });
          });
        console.log(address, privatekey, balance);
      }
    }

    for (let i = 0; i < allFreelancers.length; i++) {}
  });
};



sendBNBMultipleWallet = async (amount) => {
  const addresses = await getWallets();
  for (let i = 0; i < addresses.length; i++) {
    const send = await sendBNBOneWallet(addresses[i].address, amount);
    console.log(send);
  }
};
// createWallet(3);
getBNBToOneWallet = async (to, who) => {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    const wallets = await getWallets(who);
    for (let i = 0; i < wallets.length; i++) {
      const amount = await web3.eth.getBalance(wallets[i].address);
      const gasLimit = await web3.eth.estimateGas({
        from: wallets[i].address,
        to: to,
      });
      var tx = {
        from: wallets[i].address,
        gas: web3.utils.toHex(gasLimit),
        gasPrice: web3.utils.toHex(gasPrice),
        to: to,
        value: amount - gasLimit * gasPrice,
      };
      const privateKey = wallets[i].privKey;

      const signPromise = web3.eth.accounts
        .signTransaction(tx, privateKey)
        .then((signedTx) => {
          const sentTx = web3.eth.sendSignedTransaction(
            signedTx.raw || signedTx.rawTransaction
          );
          sentTx.on("receipt", (receipt) => {
            console.log("SENT FROM: " + wallets[i].address);
          });
          sentTx.on("error", (err) => {
            console.log(err, "error");
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
};




async function startBot(accountCount,min,max){
await createEmployerAccount(accountCount, ["TR", "DE", "FR", "EN"]);
console.log("Employer ACCOUNTS CREATED")
await wait(5000)
await createFreelancerAccount(accountCount, ["TR", "DE", "FR", "EN"]);
console.log("Freelancer ACCOUNTS CREATED")
await wait(5000)
await createWork(min, max); 
console.log("WORKS CREATED")
await wait(5000)
await createOffers(min, max)
console.log("OFFERS CREATED")
/*
await wait(5000)
await sendArgonToEmployers(min, max);
await wait(5000)
await acceptOfferAllowence(min,max)
await wait(5000)
await acceptOffer(min,max)
await wait(5000)
await sendFiles(min,max)
await wait(5000)
await acceptFiles(min,max)
*/
}



async function blockToTime(increaseValue, blockNumber){
  const nowBlockNumber = await web3.eth.getBlockNumber()
  const diffBlockNumber = await blockNumber - nowBlockNumber
  const timeSecond = await diffBlockNumber * increaseValue * 1000
  const currentDate = await new Date();
  const timestamp = await currentDate.getTime();
  const newTimeStamp = await timeSecond + timestamp
  const finishDate = moment(newTimeStamp).calendar();
  console.log(finishDate)
}

//sendBNBMultipleWallet("0.1");
//getBNBToOneWallet("0xfA198959854514d80EaDec68533F289f93AB9cc6", "d");
//getBNBToOneWallet("0xfA198959854514d80EaDec68533F289f93AB9cc6", "freelancer");
//getWallets()

//createEmployerAccount(50, ["TR", "DE", "FR", "EN"]);
//createFreelancerAccount(1, ["TR", "DE", "FR", "EN"]);
//createWork(0, 2); //mainnet
//createOffers(0,7)
//blockToTime(3,8379644)
//sendArgonToEmployers(0, 3);
//acceptOfferAllowence(0,3)
//acceptOffer(0,7)
//sendFiles(0,3)
//acceptFiles(0,3)


/*
createAccountOneWallet({
  address: "0xc052759E6e95d58C82aE79b6f487D716283b583D",
  privatekey:
    "0xffefc50c2fd0300f824b104197b74cc35c383a68898aa22a60f3163bbacd80ca",
});
*/
