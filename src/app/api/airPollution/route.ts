import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const searchParams = req.nextUrl.searchParams;

        const lat = searchParams.get("lat") || "21.02818";
        const lon = searchParams.get("lon") || "105.8333";
        const language = searchParams.get("lang") || "en";  

        const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=${language}`;

        const res = await axios.get(url);

        return new Response(JSON.stringify(res.data));
    } catch (error) {
        console.error("Error fetching air pollution data:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}