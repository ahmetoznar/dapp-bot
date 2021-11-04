const split = "==!@!==";
async function getPersonData(address) {
  console.log(address);
  let main = await getMain();
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

module.exports;
