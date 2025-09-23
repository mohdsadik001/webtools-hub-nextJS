import { useState } from 'react';

export function useCurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionRate, setConversionRate] = useState(null);

  const API_KEY = "f48126a537be16d5623dc2b9";

  const convertCurrency = async (t) => {
    if (!amount || isNaN(amount)) {
      alert(t("invalidAmountAlert"));
      return;
    }
    try {
      const res = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const data = await res.json();
      if (data.result === "success") {
        setConvertedAmount(data.conversion_result);
        setConversionRate(data.conversion_rate);
      } else {
        alert(t("conversionFailedAlert") + data["error-type"]);
      }
    } catch (err) {
      alert("Conversion failed.");
      console.error(err);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedAmount,
    conversionRate,
    convertCurrency,
    handleSwap
  };
}
