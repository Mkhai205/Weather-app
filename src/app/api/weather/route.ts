import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const lat = 37.7749; // Example latitude for San Francisco
        const lon = -122.4194; // Example longitude for San Francisco

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const res = await axios.get(url);

        return new Response(JSON.stringify(res.data));
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}