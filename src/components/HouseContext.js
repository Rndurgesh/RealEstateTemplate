import React, { useState, useEffect, createContext } from "react";

// importing data
import { housesData } from "../data";

// importing context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price ranges (any)");
  const [loading, setLoading] = useState(false);

  // return the countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // removing duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, []);

  // return the properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // removing duplicates
    const uniqueProperties = ["Location (any)", ...new Set(allProperties)];

    // set Properties state
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    // setting loading
    setLoading(true);

    // checking the find function  is working or not
    // console.log(country, property, price);

    // creating the function that checks if the string  includes
    // ("(any");
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    // get first value of price and parse it it number
    const minPrice = parseInt(price.split(" ")[0]);
    //  geting the second value of price which is maximum
    const maxPrice = parseInt(price.split(" ")[2]);

    // checking the price
    console.log(maxPrice);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }

      // if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      // if country is not default
      if (!isDefault(country) && isDefault(price) && isDefault(property)) {
        return house.country === country;
      }

      // if property  is not default
      if (isDefault(country) && isDefault(price) && !isDefault(property)) {
        return house.type === country;
      }

      // ifprice  is not default
      if (isDefault(country) && !isDefault(price) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // if country and property are not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      // if country and price are not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // if property and price are not default
      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
        loading,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
