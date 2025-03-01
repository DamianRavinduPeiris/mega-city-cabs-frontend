import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { LatLngBoundsExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
    pickup: [number, number];
    destination: [number, number];
}

const MapComponent: React.FC<MapProps> = ({ pickup, destination }) => {
    const bounds: LatLngBoundsExpression = [pickup, destination];

    return (
        <MapContainer
            bounds={bounds}
            boundsOptions={{ padding: [50, 50] }}
            style={{ height: "400px", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={pickup} />
            <Marker position={destination} />
            <Polyline positions={[pickup, destination]} />
        </MapContainer>
    );
};

export default MapComponent;
