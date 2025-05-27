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