'use strict';

class Interface {
  constructor() {
    this.init();
  }

  init() {
    this.buildSelect();
  }

  buildSelect() {
    api.getCurrencyInfo()
      .then(currency => {
        const select = document.querySelector('#criptomoneda');

        for(const[key, value] of Object.entries(currency.currency.Data)) {
          const selectOption = document.createElement('option');
          selectOption.value = value.Symbol;
          selectOption.appendChild(document.createTextNode(value.CoinName))
          select.appendChild(selectOption);
      }})
  }

  showMessage(message, classes){
    const div = document.createElement('div');
    div.className = classes;
    div.appendChild(document.createTextNode(message));
    const messageDiv = document.querySelector('.mensajes');
    messageDiv.appendChild(div);

    setTimeout(() =>{
      document.querySelector('.mensajes div').remove();
    }, 3000);
  }

  showResult(result, currency, cryptoC) {
    const previousResult =  document.querySelector('#resultado > div');

    if(previousResult){
      previousResult.remove();
    }

    const currencyData = result[cryptoC][currency];

    let price = currencyData.PRICE.toFixed(2);
    let variation = currencyData.CHANGEPCTDAY.toFixed(2);
    let lastUpdate = new Date(currencyData.LASTUPDATE * 1000).toLocaleDateString('es-ES');

    let html = `
                <div class="card bg-warning">
                    <div class="card-body text-light">
                        <h2 class="card-title">Resultado:</h2>
                            <p>El precio de ${currencyData.FROMSYMBOL} a moneda ${currencyData.TOSYMBOL} es de: ${price}</p>
                            <p>Variación último día: %${variation}</p>
                            <p>Última actualización: ${lastUpdate}</p>
                    </div>
                </div>`;

    this.showSpinner('block');

    setTimeout(()=>  {
      document.querySelector('#resultado').innerHTML = html;
      this.showSpinner('none');
    }, 2000)
  
  }

  showSpinner(view) {
    const spinner = document.querySelector('.contenido-spinner');
    spinner.style.display = view;

  }
}