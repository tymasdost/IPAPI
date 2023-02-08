import { MapContainer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from 'leaflet'
import icons from './icon'
import { useEffect, useState, useRef } from 'react';


function Map(props) {
    const mapContainer = useRef();
    const [map, setMap] = useState({});

    useEffect(() => {
        const map = L.map(mapContainer.current, { attributionControl: false }).setView(props.cords, 15);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(map);
        const mark = L.marker(props.cords, {icon:icons});
        mark.addTo(map);
        // unmount map function
        return () => map.remove();
    }, [props.cords]);

    return (
        <div id='map'
            ref={el => mapContainer.current = el}>
        </div>
    );
}
export default Map;
