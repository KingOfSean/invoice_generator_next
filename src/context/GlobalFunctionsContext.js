"use client";
import { createContext, useContext } from "react";

const GlobalFunctionsContext = createContext();

export const GlobalFunctionsProvider = ({ children }) => {
    const toCamelCase = (string) => {
        return string
            .toLowerCase()
            .split(" ")
            .map((word, index) =>
                index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join("");
    }

    const capitalizeWords = (string) => {
        console.log(string)
        return string
            .toLowerCase()
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    function priceFormatter(price)
    {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(price);
    }

    return (
        <GlobalFunctionsContext.Provider
            value={{
                toCamelCase,
                capitalizeWords,
                priceFormatter,
            }}
        >
            {children}
        </GlobalFunctionsContext.Provider>
    );
};

export const useGlobalFunctions = () => useContext(GlobalFunctionsContext);
