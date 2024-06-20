import React, { ChangeEvent, FC } from "react";
import SelectComponent from "./SelectCurrency";
import { Currency } from "./CurrencyConverter";

interface CurrencyConverterUIProps {
  currencies: Currency[];
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number | null;
  onFromCurrencyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onToCurrencyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyConverterUI: FC<CurrencyConverterUIProps> = ({
  currencies,
  fromCurrency,
  toCurrency,
  amount,
  convertedAmount,
  onFromCurrencyChange,
  onToCurrencyChange,
  onAmountChange,
}) => {
  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <SelectComponent
        label="From:"
        currencies={currencies}
        value={fromCurrency}
        onChange={onFromCurrencyChange}
      />
      <SelectComponent
        label="To:"
        currencies={currencies}
        value={toCurrency}
        onChange={onToCurrencyChange}
      />
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={onAmountChange} />
      </div>
      <div>
        <label>Converted Amount:</label>
        <input
          type="text"
          value={convertedAmount !== null ? convertedAmount.toFixed(2) : ""}
          readOnly
        />
      </div>
    </div>
  );
};

export default CurrencyConverterUI;
