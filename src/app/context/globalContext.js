"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});

    // Fetch weather forecast data
    const fetchForecast = async () => {
        try {
            const res = await axios.get("api/weather");

            if (res && res.data) {
                setForecast(res.data);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // Fetch air quality data
    const fetchAirQuality = async () => {
        try {
            const res = await axios.get("api/airPollution");

            if (res && res.data) {
                setAirQuality(res.data);
            }
        } catch (error) {
            console.error("Error fetching air quality data:", error);
        }
    };

    // Fetch five-day forecast data
    const fetchFiveDayForecast = async () => {
        try {
            const res = await axios.get("api/fiveDayForecast");

            console.log("🚀 ~ globalContext.js:43 ~ fetchFiveDayForecast ~ res:", res);

            if (res && res.data) {
                setFiveDayForecast(res.data);
            }
        } catch (error) {
            console.error("Error fetching five-day forecast data:", error);
        }
    };

    useEffect(() => {
        fetchForecast();
        fetchAirQuality();
        fetchFiveDayForecast();
    }, []);

    return (
        <GlobalContext.Provider value={{ forecast, airQuality, fiveDayForecast }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error("useGlobalContext must be used within a GlobalContextProvider");
    }
    return context;
};
