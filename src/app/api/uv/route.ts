import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const lat = 21.02818;
        const lon = 105.8333;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

        const res = await axios.get(url);

        return new Response(JSON.stringify(res.data));
    } catch (error) {
        console.error("Error fetching UV data:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}