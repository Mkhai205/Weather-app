import moment from "moment";
import i18n from "../i18n";

// Helper function to safely translate text
const safeTranslate = (key: string, defaultValue?: string): string => {
  try {
    return i18n.t(key) || defaultValue || key;
  } catch (error) {
    console.warn(`Translation error for key: ${key}`, error);
    return defaultValue || key;
  }
};

export const kelvinToCelsius = (kelvin: number): number => {
    return Math.round(kelvin - 273.15);
}

export const unixToTime = (unixTimestamp: number, timezone: number): string => {
    // Set moment locale based on current language
    moment.locale(i18n.language);
    return moment.unix(unixTimestamp).utcOffset(timezone / 60).format("HH:mm");
}

export const unixToDay = (unixTimestamp: number, timezone: number): string => {
    // Set moment locale based on current language
    moment.locale(i18n.language);
    return moment.unix(unixTimestamp).utcOffset(timezone / 60).format("dddd");
}

export const airQualityDescription = (aqi: number): string => {
    switch (true) {
        case aqi >= 0 && aqi <= 20:
            return safeTranslate("airQuality.good", "Good");
        case aqi > 20 && aqi <= 40:
            return safeTranslate("airQuality.fair", "Fair");
        case aqi > 40 && aqi <= 60:
            return safeTranslate("airQuality.moderate", "Moderate");
        case aqi > 60 && aqi <= 80:
            return safeTranslate("airQuality.poor", "Poor");
        case aqi > 80 && aqi <= 100:
            return safeTranslate("airQuality.veryPoor", "Very Poor");
        default:
            return safeTranslate("airQuality.unknown", "Unknown");
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
            label: safeTranslate("uvIndex.low", "Low"),
            description: safeTranslate("uvIndex.lowDesc", "No protection required."),
        };
    } else if (uvIndex <= 5) {
        return {
            label: safeTranslate("uvIndex.moderate", "Moderate"),
            description: safeTranslate("uvIndex.moderateDesc", "Protection required, especially for children."),
        };
    } else if (uvIndex <= 7) {
        return {
            label: safeTranslate("uvIndex.high", "High"),
            description: safeTranslate("uvIndex.highDesc", "Protection required, avoid sun exposure."),
        };
    } else if (uvIndex <= 10) {
        return {
            label: safeTranslate("uvIndex.veryHigh", "Very High"),
            description: safeTranslate("uvIndex.veryHighDesc", "Extra protection required, avoid sun exposure."),
        };
    } else {
        return {
            label: safeTranslate("uvIndex.extreme", "Extreme"),
            description: safeTranslate("uvIndex.extremeDesc", "Take all precautions, avoid sun exposure."),
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
        return safeTranslate("feelsLike.colder", "Feels significantly colder than actual temperature");
    } else if (feelsLike >= temperatureAverage - 5 && feelsLike <= temperatureAverage + 5) {
        return safeTranslate("feelsLike.close", "Feels close to the actual temperature");
    } else if (feelsLike > temperatureAverage + 5) {
        return safeTranslate("feelsLike.warmer", "Feels significantly warmer than actual temperature");
    } else {
        return safeTranslate("feelsLike.same", "Feels like the actual temperature");
    }
};

export const humidityDescription = (humidity: number) => {
    if (humidity < 0) {
        return safeTranslate("humidity.unavailable", "Unavailable: Humidity data not available.");
    }

    if (humidity < 30) {
        return safeTranslate("humidity.dry", "Dry: May cause dry skin and irritation.");
    } else if (humidity < 60) {
        return safeTranslate("humidity.comfortable", "Comfortable: Ideal for health and comfort.");
    } else if (humidity < 80) {
        return safeTranslate("humidity.moderate", "Moderate: May feel a bit sticky, but generally comfortable.");
    } else if (humidity <= 100) {
        return safeTranslate("humidity.high", "High: Can cause discomfort, potential for mold growth.");
    } else {
        return safeTranslate("humidity.unknown", "Unknown humidity level.");
    }
}

export const visibilityDescription = (visibility: number) => {
    if (visibility < 0) {
        return safeTranslate("visibility.unavailable", "Unavailable: Visibility data is not provided.");
    }

    if (visibility <= 2) {
        return safeTranslate("visibility.poor", "Poor: Restricted and unclear visibility.");
    } else if (visibility <= 5) {
        return safeTranslate("visibility.moderate", "Moderate: Some limitation in visibility.");
    } else if (visibility <= 8) {
        return safeTranslate("visibility.good", "Good: Easily navigable visibility.");
    } else {
        return safeTranslate("visibility.excellent", "Excellent: Clear visibility.");
    }
}

export const pressureDescription = (pressure: number) => {
    if (pressure < 0) {
        return safeTranslate("pressure.unavailable", "Unavailable: Pressure data is not available.");
    }

    if (pressure < 1000) {
        return safeTranslate("pressure.low", "Low pressure, indicating stormy weather.");
    } else if (pressure >= 1000 && pressure < 1020) {
        return safeTranslate("pressure.normal", "Normal pressure, indicating stable weather.");
    } else if (pressure >= 1020 && pressure < 1030) {
        return safeTranslate("pressure.high", "High pressure, indicating fair weather.");
    } else {
        return safeTranslate("pressure.veryHigh", "Very high pressure, indicating clear skies.");
    }
}