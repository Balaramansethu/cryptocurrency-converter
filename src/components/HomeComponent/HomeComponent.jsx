import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import "../HomeComponent/HomeComponent.css";
import Button from "@mui/material/Button";

const HomeComponent = () => {
  const [currencySearch, setCurrencySearch] = useState('');
  const [cryptoSearch, setCryptoSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [cryptoOptions, setCryptoOptions] = useState([]);
  const [inputvalue, setInputvalue] = useState(0)

  const apiFetch = () => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencySearch}&ids=${cryptoSearch}`
      )
      .then((response) => {
        setSearchResult(response.data);
      });
  };

  const fetchCurrencyOptions = () => {
    axios
      .get("https://api.coingecko.com/api/v3/simple/supported_vs_currencies")
      .then((response) => {
        const options = response.data.map((currency) => ({
          value: currency,
          label: currency,
        }));
        setCurrencyOptions(options);
      });
  };

  const fetchCryptoOptions = () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/list")
      .then((response) => {
        const options = response.data.map((crypto) => ({
          value: crypto.id,
          label: crypto.name,
        }));
        setCryptoOptions(options);
      });
  };

  const handleInputValue = (event) => {
    setInputvalue(event.target.value)
  }

  useEffect(() => {
    fetchCurrencyOptions();
    fetchCryptoOptions();
  }, []);

  const handleCurrencySearch = (selectedOption) => {
    setCurrencySearch(selectedOption.value);
  };

  const handleCryptoSearch = (selectedOption) => {
    setCryptoSearch(selectedOption.value);
  };

  return (
    <div className="container">
      <h1>Please select a currency and cryptocurrency</h1>
      <div className="input-container">
        <input type="text" placeholder=" Enter amount to convert" onChange={handleInputValue}/>
        <Select
          options={currencyOptions}
          onChange={handleCurrencySearch}
          placeholder="Select currency or type"
          isClearable
          isSearchable
        />
        <Select
          options={cryptoOptions}
          onChange={handleCryptoSearch}
          placeholder="Select cryptocurrency or type"
          isClearable
          isSearchable
        />
        <Button variant="contained" onClick={apiFetch}>
          Submit
        </Button>
      </div>
      <div className="result">
        <h2>
          {searchResult.map((result) => (
            <h2 className="result" key={result.id}>
              Current Price of {result.name} is : {result.current_price * inputvalue}
            </h2>
          ))}
        </h2>
      </div>
    </div>
  );
};

export default HomeComponent;
