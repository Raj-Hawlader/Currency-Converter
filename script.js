document.getElementById('converter-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const amount = document.getElementById('amount').value;

    if (amount === '' || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const resultElement = document.getElementById('result');
    resultElement.textContent = 'Fetching conversion rate...';

    fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
            if (data.result === "error") {
                resultElement.textContent = 'Error fetching exchange rates. Please try again.';
                return;
            }

            const exchangeRate = data.conversion_rates[toCurrency];
            if (!exchangeRate) {
                resultElement.textContent = 'Unable to convert to the selected currency.';
                return;
            }

            const convertedAmount = (amount * exchangeRate).toFixed(2);
            resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            resultElement.textContent = 'Error fetching exchange rates. Please try again later.';
        });
});
