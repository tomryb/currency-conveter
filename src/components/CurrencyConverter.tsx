import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import CurrencyConverterUI from "./CurrencyConverterUI";
import { useDebounce } from "./useDebounce";

export interface Currency {
  id: string;
  name: string;
  short_code: string;
  code: string;
}

const API_KEY = "NHKNUhI53ZApF4IXCOX1DpUj2YTSl2U1";
const BASE_URL = "https://api.currencybeacon.com/v1";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [renderKey, setRenderKey] = useState<number>(0);

  const debouncedAmount = useDebounce(amount, 500);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/currencies?api_key=${API_KEY}`
        );
        const data = response.data;

        if (!data || typeof data !== "object") {
          throw new Error("Invalid data format");
        }

        const currencyArray = Object.keys(data).map((key) => ({
          id: data[key].id,
          name: data[key].name,
          short_code: data[key].short_code,
          code: data[key].code,
        }));

        setCurrencies(currencyArray);

        setRenderKey((prevKey) => prevKey + 1);
      } catch (err) {
        console.error("Detailed fetch error:", err);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchConvertedAmount = async () => {
      if (fromCurrency && toCurrency && debouncedAmount) {
        try {
          const response = await axios.get(
            `${BASE_URL}/convert?api_key=${API_KEY}&from=${fromCurrency}&to=${toCurrency}&amount=${debouncedAmount}`
          );
          const convertedValue = response.data.value;
          setConvertedAmount(convertedValue);
        } catch (err) {
          console.error("Detailed conversion error:", err);
        }
      }
    };

    fetchConvertedAmount();
  }, [fromCurrency, toCurrency, debouncedAmount]);

  const handleFromCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <CurrencyConverterUI
      key={renderKey}
      currencies={currencies}
      fromCurrency={fromCurrency}
      toCurrency={toCurrency}
      amount={amount as number}
      convertedAmount={convertedAmount}
      onFromCurrencyChange={handleFromCurrencyChange}
      onToCurrencyChange={handleToCurrencyChange}
      onAmountChange={handleAmountChange}
    />
  );
};

export default CurrencyConverter;
