"use client";
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { ArrowLeftRight, DollarSign } from 'lucide-react';

import Button from '@/components/ui/buttons/Button';
import Input from '@/components/ui/Input';
import { countriesList } from '@/data/countries-list';
import { useCurrencyConverter } from '@/hooks/useCurrencyConverter';

const customStyles = {
  control: (base, state) => ({
    ...base,
    border: "1px solid #ccc",
    padding: "0.42rem 0.5rem",
    borderRadius: "0.375rem",
    outline: state.isFocused ? "2px solid #10B981" : "none",
    boxShadow: "none",
    minHeight: "48px",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 999,
  }),
};

const CurrencyConverter = () => {
  const { t } = useTranslation("common");
  const {
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
  } = useCurrencyConverter();

  const countryOptions = countriesList.map((c) => ({
    label: `${c.flag} ${c.currency_code} ${c.name}`,
    value: c.currency_code,
  }));

  return (
    <main className="mt-2 md:mt-8 flex flex-col px-4 md:px-12 lg:px-20 xl:px-32 py-6">
      {/* Header */}
      <div className="flex flex-col items-end self-start">
        <h1 className="text-xl md:text-3xl font-semibold uppercase text-gray-800">
          {t("currencyConverterTitle")}
        </h1>
        <div className="w-24 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* Input Grid */}
      <div className="grid grid-cols-1 relative md:grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-6 items-end">
        {/* Amount */}
        <div>
          <label htmlFor="amount-input" className="block mb-1 font-medium text-gray-700">
            {t("amountLabel")}
          </label>
          <Input
            id="amount-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("amountPlaceholder")}
            ariaLabel={t("amountLabel")}
          />
        </div>

        {/* From Currency */}
        <div>
          <label htmlFor="from-currency-select" className="block mb-1 font-medium text-gray-700">
            {t("fromLabel")}
          </label>
          <Select
            inputId="from-currency-select"
            styles={customStyles}
            options={countryOptions}
            onChange={(option) => setFromCurrency(option.value)}
            value={countryOptions.find((c) => c.value === fromCurrency)}
            aria-label={t("fromLabel")}
          />
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          aria-label={t("swapCurrencies")}
          className="absolute cursor-pointer right-32 rotate-90 md:rotate-0 md:right-114 z-100 bottom-13 md:bottom-2 bg-primary text-white p-2 rounded-full shadow hover:bg-primary-dull transition"
        >
          <ArrowLeftRight size={20} />
        </button>

        {/* To Currency */}
        <div className="relative">
          <label htmlFor="to-currency-select" className="block mb-1 font-medium text-gray-700">
            {t("toLabel")}
          </label>
          <Select
            inputId="to-currency-select"
            styles={customStyles}
            options={countryOptions}
            onChange={(option) => setToCurrency(option.value)}
            value={countryOptions.find((c) => c.value === toCurrency)}
            aria-label={t("toLabel")}
          />
        </div>
      </div>

      {/* Convert Button */}
      <Button
        onClick={() => convertCurrency(t)}
        className="flex gap-3 mt-2 md:mt-6 items-center justify-center cursor-pointer w-full px-3 py-3 rounded-md bg-primary hover:bg-primary-dull transition text-white text-lg font-medium"
        ariaLabel={t("convertBtn")}
        icon={DollarSign}
      >
        {t("convertBtn")}
      </Button>

      {/* Result Box */}
      <div className="w-full border-2 border-primary rounded-lg mt-2 md:mt-6 px-2 md:px-6 py-2 md:py-6 min-h-[20vh] flex items-center justify-center text-center">
        {convertedAmount ? (
          <div className="text-lg md:text-xl font-medium text-gray-800 space-y-3">
            <p>{t("convertedAmountLabel")}</p>
            <div className="text-primary text-2xl md:text-4xl font-bold">
              {`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}
            </div>
            <p>{t("conversionRateLabel")}</p>
            <div className="text-primary text-2xl md:text-4xl font-bold">
              {`1 ${fromCurrency} = ${conversionRate} ${toCurrency}`}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">{t("enterDetailsMessage")}</p>
        )}
      </div>
    </main>
  );
};

export default CurrencyConverter;
