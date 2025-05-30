"use client";
import React, { useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { useGlobalContext } from "@/app/context/globalContext";

function FlyToActiveCity({ activeCityCoords }: { activeCityCoords: [number, number] }) {
    const map = useMap();

    useEffect(() => {
        if (activeCityCoords) {
            const zoomLevel = 13;
            const flyToOptions = {
                duration: 1.5,
            };
            map.flyTo(activeCityCoords, zoomLevel, flyToOptions);
        }
    }, [activeCityCoords, map]);

    return null;
}

function Mapbox() {
    // Dynamically import MapContainer to avoid SSR issues
    const MapContainer = useMemo(
        () =>
            dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
                loading: () => <Skeleton className="h-full w-full rounded-lg" />,
                ssr: false,
            }),
        []
    );
    const TileLayer = useMemo(
        () =>
            dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
                ssr: false,
            }),
        []
    );

    const { forecast } = useGlobalContext();

    const acviveCityCoords = forecast?.coord;

    if (!acviveCityCoords) {
        return <Skeleton className="h-[26rem] w-full rounded-lg lg:w-3/4 lg:flex-[3]" />;
    }

    return (
        <div className="w-full h-[26rem] lg:w-3/4 lg:flex-[3]">
            <MapContainer
                center={acviveCityCoords}
                zoom={10}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
                className="rounded-lg duration-700 transition-all"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <FlyToActiveCity activeCityCoords={acviveCityCoords} />
            </MapContainer>
        </div>
    );
}

export default Mapbox;
