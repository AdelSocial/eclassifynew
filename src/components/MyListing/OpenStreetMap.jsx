'use client';

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function OpenStreetMap({ latitude, longitude }) {
    if (!latitude || !longitude) return null;

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "200px", width: "100%", borderRadius: "8px" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
                <Popup>Location</Popup>
            </Marker>
        </MapContainer>
    );
}
