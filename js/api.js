'use strict';

class API {
  constructor(apikey){
    this.apikey = apikey;
  }

  async getCurrencyInfo(){
    const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;

    const getMoney = await fetch(url)
    const currency = await getMoney.json();

    return {
      currency
      }
    }

  async getValues(currency, cryptoC){
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoC}&tsyms=${currency}&api_key=${this.apikey}`

    const urlConvert = await fetch(url);
    const result = await urlConvert.json();

    return{
      result
    }
  }

  }