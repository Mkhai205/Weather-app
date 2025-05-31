"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import defaultStates from "../utils/defaultStates";
import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContestUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");
    const [geoCodedList, setGeoCodedList] = useState(defaultStates);
    const [searchInput, setSearchInput] = useState("");
    const [activeCityCoords, setActiveCityCoords] = useState({ lat: 21.0285, lon: 105.804 });
    const [forecast, setForecast] = useState({});
    const [airQuality, setAirQuality] = useState({});
    const [fiveDayForecast, setFiveDayForecast] = useState({});
    const [uvIndex, setUvIndex] = useState({});

    // Fetch weather forecast data
    const fetchForecast = async (lat, lon, language) => {
        try {
            const res = await axios.get(`api/weather?lat=${lat}&lon=${lon}&lang=${language}`);

            if (res && res.data) {
                setForecast(res.data);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    // Fetch air quality data
    const fetchAirQuality = async (lat, lon, language) => {
        try {
            const res = await axios.get(`api/airPollution?lat=${lat}&lon=${lon}&lang=${language}`);

            if (res && res.data) {
                setAirQuality(res.data);
            }
        } catch (error) {
            console.error("Error fetching air quality data:", error);
        }
    };

    // Fetch five-day forecast data
    const fetchFiveDayForecast = async (lat, lon, language) => {
        try {
            const res = await axios.get(
                `api/fiveDayForecast?lat=${lat}&lon=${lon}&lang=${language}`
            );

            if (res && res.data) {
                setFiveDayForecast(res.data);
            }
        } catch (error) {
            console.error("Error fetching five-day forecast data:", error);
        }
    };

    // Fetch UV index data
    const fetchUvIndex = async (lat, lon, language) => {
        try {
            const res = await axios.get(`api/uv?lat=${lat}&lon=${lon}&lang=${language}`);

            if (res && res.data) {
                setUvIndex(res.data);
            }
        } catch (error) {
            console.error("Error fetching UV index data:", error);
        }
    };

    const fetchGeoCodedList = async (query) => {
        try {
            const res = await axios.get(`api/geoCoded?query=${query}`);

            if (res && res.data) {
                setGeoCodedList(res.data);
            }
        } catch (error) {
            console.error("Error fetching geocoded list:", error);
        }
    };

    useEffect(() => {
        fetchForecast(activeCityCoords.lat, activeCityCoords.lon, language);
        fetchAirQuality(activeCityCoords.lat, activeCityCoords.lon, language);
        fetchFiveDayForecast(activeCityCoords.lat, activeCityCoords.lon, language);
        fetchUvIndex(activeCityCoords.lat, activeCityCoords.lon, language);
    }, [activeCityCoords, language]);

    // Debounce the search input to avoid too many API calls
    useEffect(() => {
        const debouncedFetch = debounce((query) => {
            fetchGeoCodedList(query);
        }, 500);

        if (searchInput) {
            debouncedFetch(searchInput);
        }

        return () => {
            debouncedFetch.cancel();
        };
    }, [searchInput]);

    // Handle input changes for search
    const handleInput = (event) => {
        setSearchInput(event.target.value);

        if (event.target.value === "") {
            setGeoCodedList(defaultStates);
            return;
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                forecast,
                airQuality,
                fiveDayForecast,
                uvIndex,
                geoCodedList,
                searchInput,
                handleInput,
                setActiveCityCoords,
            }}
        >
            <GlobalContestUpdate.Provider
                value={{
                    setActiveCityCoords,
                    setLanguage,
                }}
            >
                {children}
            </GlobalContestUpdate.Provider>
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

export const useGlobalContextUpdate = () => {
    const context = useContext(GlobalContestUpdate);
    if (context === undefined) {
        throw new Error("useGlobalContextUpdate must be used within a GlobalContextProvider");
    }
    return context;
};
