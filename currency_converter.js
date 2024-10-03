// let img=document.querySelector(".select-container img");
const updateFlag=(element)=>{
    let code=element.value;
    let countrycode=countryList[code];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    // console.log(element.parentElement);
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}

let dropdowns=document.querySelectorAll("select");
for (let select of dropdowns){
    for(let codes in countryList){
        let newOpt=document.createElement("option");
        newOpt.value=codes;
        newOpt.innerText=codes;
        if(select.name==="from"&&codes==="USD"){
            newOpt.selected="selected";
        }else if(select.name==="to"&&codes==="INR"){
            newOpt.selected="selected";
        }
        select.append(newOpt);
    }
    select.addEventListener("change", (evt) => {
        // console.log(evt);
        // console.log(evt.target);
        updateFlag(evt.target);
      });
}

let baseUrl="https://api.frankfurter.app/latest?amount=1&from=USD&to=INR";
let msg=document.querySelector(".msg");
const updateExchangeRate = async () => {
    const amountInput = document.querySelector('.amount input');
    const amount = amountInput.value;
    const fromSelect = document.querySelector('.from select');
    const from = fromSelect.value;
    const toSelect = document.querySelector('.to select');
    const to = toSelect.value;
    const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data);
    msg.innerText = `${amount}${from} = ${data.rates[to]}${to}`;
  };

let btn=document.querySelector(".btn");
btn.addEventListener(("click"),(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
  });
