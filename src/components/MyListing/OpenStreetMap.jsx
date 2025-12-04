'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "@/components/leaflet-fix";

export default function OpenStreetMap({ latitude, longitude }) {
    if (!latitude || !longitude) return null;

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "200px", width: "100%", borderRadius: "8px" }}
        >
              <TileLayer 
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" 
                attribution="&copy; OpenStreetMap" 
            />
            {/* <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" /> */}
            <Marker position={[latitude, longitude]}>
                <Popup>Location</Popup>
            </Marker>
        </MapContainer>
    );
}
