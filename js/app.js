 'use strict';

const api = new API('b050ceab2f708113aed31a7773fe132f3f1837e3bdf8c4cc937fe70821193030');
const ui = new Interface();

const form = document.querySelector('#formulario');
const currency = document.querySelector('#moneda');
const cryptoC = document.querySelector('#criptomoneda');

function calculateValue(e){
e.preventDefault();

const selectedCurrency = currency.options[currency.selectedIndex].value;

const selectedCrypto = cryptoC.options[cryptoC.selectedIndex].value;

if(selectedCurrency === '' || selectedCrypto === ''){
  ui.showMessage('Ambos campos son obligatorios','alert bg-danger text-center')
} else {
  api.getValues(selectedCurrency, selectedCrypto)
    .then(data => {
      ui.showResult(data.result.RAW, selectedCurrency, selectedCrypto);
    })
}

}




form.addEventListener('submit', calculateValue);