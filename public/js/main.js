// assigning variables
const mainHeading = document.querySelector("#mainHeading");
const nameHeading = document.querySelector("#name");
const totalConf = document.querySelector(".totalConf");
const tf = document.querySelector("#tf");
const totalDeath = document.querySelector(".totalDeath");
const td = document.querySelector("#td");
const totalRec = document.querySelector(".totalRec");
const tr = document.querySelector("#tr");
const newConf = document.querySelector(".newConf");
const nc = document.querySelector("#nc");
const newDeath = document.querySelector(".newDeath");
const nd = document.querySelector("#nd");
const newRec = document.querySelector(".newRec");
const nr = document.querySelector("#nr");
const selectDiv = document.querySelector(".selectDiv");
const result = document.querySelectorAll(".result");
const searchBtn = document.querySelector("#searchBtn");
const lastUpdated = document.querySelector(".lastUpdated");

let select;
let option;

// text content
mainHeading.textContent = "Covid-19 Cases Tracker";
nameHeading.textContent = "Loading...";
result.forEach((elem) => {
    elem.textContent = "Calculating..."
})
tf.textContent = "Total Confirmed";
td.textContent = "Total Deaths";
tr.textContent = "Total Recovered";
nc.textContent = "New Confirmed";
nd.textContent = "New Deaths";
nr.textContent = "New Recovered";
searchBtn.textContent = "Search";


// functions
const API_URL = "https://api.covid19api.com/summary";
let jsonData;
let countriesCases;

const getGlobalCases = async () => {
    try {
        const data  = await fetch(API_URL);
         jsonData = await data.json();
        const globalCases = await jsonData.Global;


    nameHeading.innerHTML = "Global";
    totalConf.innerHTML = `${globalCases.TotalConfirmed}`;
    totalDeath.innerHTML = `${globalCases.TotalDeaths}`;
    totalRec.innerHTML = `${globalCases.TotalRecovered}`;
    newConf.innerHTML = `${globalCases.NewConfirmed}`;
    newDeath.innerHTML = `${globalCases.NewDeaths}`;
    newRec.innerHTML = `${globalCases.NewRecovered}`;
    lastUpdated.innerHTML = `Last Updated ${jsonData.Date}`;

    countriesCases = jsonData.Countries;

    select = document.createElement("Select");
    select.setAttribute("id", "countrySelected");
    selectDiv.appendChild(select);

    for(let i = 0; i < countriesCases.length; i++){
        option = document.createElement("option");
        document.getElementById("countrySelected").appendChild(option);
        option.setAttribute("value", countriesCases[i].Country);
        const countryName = document.createTextNode(countriesCases[i].Country);
        option.appendChild(countryName);
    }
    } catch (error) {
        console.log(error);
        nameHeading.innerHTML = "Please Check Your Internet Connection...";
    }

}


const getCountryCases = async () => {
    try {

        const countryValue = document.getElementById("countrySelected").value;
        
        for(let i = 0; i < countriesCases.length; i++){
            if(countriesCases[i].Country == countryValue){
                const countryCases = countriesCases[i];
          
                totalConf.innerHTML = `${countryCases.TotalConfirmed}`;
                totalDeath.innerHTML = `${countryCases.TotalDeaths}`;
                totalRec.innerHTML = `${countryCases.TotalRecovered}`;
                newConf.innerHTML = `${countryCases.NewConfirmed}`;
                newDeath.innerHTML = `${countryCases.NewDeaths}`;
                newRec.innerHTML = `${countryCases.NewRecovered}`;
                nameHeading.innerHTML = countryCases.Country;
            }
        }

} catch (error) {
    console.log(error);
    nameHeading.innerHTML = "Please Check Your Internet Connection...";
}

}

getGlobalCases();
searchBtn.addEventListener("click", getCountryCases);