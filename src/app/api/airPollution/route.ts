import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const lat = 21.02818;
        const lon = 105.8333;

        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const res = await axios.get(url);

        return new Response(JSON.stringify(res.data));
    } catch (error) {
        console.error("Error fetching air pollution data:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}