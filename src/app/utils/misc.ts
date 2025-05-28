import moment from "moment";

export const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
}

export const unixToTime = (unixTimestamp: number, timezone: number): string => {
    return moment.unix(unixTimestamp).utcOffset(timezone / 60).format("HH:mm");
}

export const airQualityDescription = (aqi: number): string => {
    switch (true) {
        case aqi >= 0 && aqi <= 20:
            return "Good";
        case aqi > 20 && aqi <= 40:
            return "Fair";
        case aqi > 40 && aqi <= 60:
            return "Moderate";
        case aqi > 60 && aqi <= 80:
            return "Poor";
        case aqi > 80 && aqi <= 100:
            return "Very Poor";
        default:
            return "Unknown";
    }
}

export const formatPopulation = (population: number): string => {
    if (population >= 1000000) {
        return (population / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (population >= 1000) {
        return (population / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return population.toString();
}

export const uvIndexCategory = (uvIndex: number) => {
    if (uvIndex <= 2) {
        return {
            label: "Low",
            description: "No protection required.",
        };
    } else if (uvIndex <= 5) {
        return {
            label: "Moderate",
            description: "Protection required, especially for children.",
        };
    } else if (uvIndex <= 7) {
        return {
            label: "High",
            description: "Protection required, avoid sun exposure.",
        };
    } else if (uvIndex <= 10) {
        return {
            label: "Very High",
            description: "Extra protection required, avoid sun exposure.",
        };
    } else {
        return {
            label: "Extreme",
            description: "Take all precautions, avoid sun exposure.",
        };
    }
}