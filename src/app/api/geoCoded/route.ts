import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const apiKey = process.env.OPENWEATHERMAP_API_KEY;
        const searchParams = req.nextUrl.searchParams;

        const query = searchParams.get("query");

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

        const res = await axios.get(url);

        return new Response(JSON.stringify(res.data));
    } catch (error) {
        console.error("Error fetching geocoded data:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}