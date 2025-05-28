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

export const feelsLikeDescription = (
    feelsLike: number,
    temperatureMax: number,
    temperatureMin: number
) => {
    const temperatureAverage = (temperatureMax + temperatureMin) / 2;
    if (feelsLike < temperatureAverage - 5) {
        return "Feels significantly colder than actual temperature";
    } else if (feelsLike > temperatureAverage + 5 && feelsLike < temperatureAverage + 5) {
        return "Feels close to the actual temperature";
    } else if (feelsLike > temperatureAverage + 5) {
        return "Feels significantly warmer than actual temperature";
    } else {
        return "Feels like the actual temperature";
    }
};

export const humidityDescription = (humidity: number) => {
    if (humidity < 0) {
        return "Unavailable: Humidity data not available.";
    }

    if (humidity < 30) {
        return "Dry: May cause dry skin and irritation.";
    } else if (humidity < 60) {
        return "Comfortable: Ideal for health and comfort.";
    } else if (humidity < 80) {
        return "Moderate: May feel a bit sticky, but generally comfortable.";
    } else if (humidity <= 100) {
        return "High: Can cause discomfort, potential for mold growth.";
    }
}

export const visibilityDescription = (visibility: number) => {
    if (visibility < 0) {
        return "Unavailable: Visibility data is not provided.";
    }

    if (visibility <= 2) {
        return "Poor: Restricted and unclear visibility.";
    } else if (visibility <= 5) {
        return "Moderate: Some limitation in visibility.";
    } else if (visibility <= 8) {
        return "Good: Easily navigable visibility.";
    } else {
        return "Excellent: Clear visibility.";
    }
}