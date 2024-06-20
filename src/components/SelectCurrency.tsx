import React, { ChangeEvent } from "react";

interface Currency {
  id: string;
  name: string;
  short_code: string;
  code: string
}

interface SelectCurrencyProps {
  label: string;
  currencies: Currency[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectCurrency: React.FC<SelectCurrencyProps> = ({
  label,
  currencies,
  value,
  onChange,
}) => {
  return (
    <div>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {currencies.map((currency) => (
          <option key={currency.id} value={currency.short_code}>
           {currency.short_code} {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCurrency;
