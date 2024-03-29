import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ initialAddress }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) {
        const map = L.map('map').setView([0, 0], 18); // Default center coordinates

        // Retrieve coordinates for initial address
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(initialAddress)}`);
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          map.setView([lat, lon], 18); // Set map center to coordinates of initial address
          L.marker([lat, lon]).addTo(map); // Add marker at initial address
        }

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        mapRef.current = map;
      }
    };

    initializeMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initialAddress]);

  return <div id="map" style={{ height: '400px', width: '100%', borderRadius: '1rem' }}></div>;
};

Map.propTypes = {
  initialAddress: PropTypes.string
  }

export default Map;






// function App() {
//   useEffect(() => {
//     const map = L.map('map').setView([51.505, -0.09], 13);
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(map);
//   }, []);

//   return (
//     <div id="map" style={{ height: '400px' }}></div>
//   );
// }

// export default App;
