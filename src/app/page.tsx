import AirPollution from "./components/AirPollution/AirPollution";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import FeelsLike from "./components/FeelsLike/FeelsLike";
import FiveDayForecast from "./components/FiveDayForecast/FiveDayForecast";
import Footer from "./components/Footer/Footer";
import Humidity from "./components/Humidity/Humidity";
import Mapbox from "./components/Mapbox/Mapbox";
import Navbar from "./components/Navbar";
import Population from "./components/Population/Population";
import Pressure from "./components/Pressure/Pressure";
import Sunset from "./components/Sunset/Sunset";
import Temperature from "./components/Temperature/Temperature";
import TopCity from "./components/TopCity/TopCity";
import UvIndex from "./components/UvIndex/UvIndex";
import Visibility from "./components/Visibility/Visibility";
import Wind from "./components/Wind/Wind";

export default function Home() {
    return (
        <main className="mx-[1rem] lg:mx-[2rem] xl:mx-[6rem] 2xl:mx-[16rem] m-auto">
            <Navbar />
            <section className="flex flex-col gap-4 md:flex-row">
                <div className="flex flex-col gap-4 w-full min-w-[18rem] md:w-[35rem]">
                    <Temperature />
                    <FiveDayForecast />
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="instruments grid gap-4 col-span-full sm-2:col-span-2 lg:grid-cols-3 xl:grid-cols-4">
                        <AirPollution />
                        <Sunset />
                        <Wind />
                        <DailyForecast />
                        <UvIndex />
                        <Population />
                        <FeelsLike />
                        <Humidity />
                        <Visibility />
                        <Pressure />
                    </div>
                    <div className="map-box flex flex-col gap-4 lg:flex-row min-h-[24rem]">
                        <Mapbox />
                        <TopCity />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
