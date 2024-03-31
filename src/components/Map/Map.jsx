import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ initialAddress, height }) => {
  const mapRef = useRef(null);
  const distanceRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) {
        const map = new L.map('map', { noScroll: true }).setView([0, 0], 18);

        // Retrieve coordinates for initial address
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(initialAddress)}`);
        const data = await response.json();

        if (data.length > 0) {
          const { lat: lat1, lon: lon1 } = data[0];

          // Retrieve coordinates for office address
          const officeResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent('Hammarby Kaj 10D, Stockholm')}`);
          const officeData = await officeResponse.json();

          if (officeData.length > 0) {
            const { lat: lat2, lon: lon2 } = officeData[0];
            const distance = calculateDistance(lat1, lon1, lat2, lon2);

            // Create marker for the provided address
            const marker = L.marker([lat1, lon1]).addTo(map);
            
            // Create popup with distance information
            const popupContent = `<b>Distance from the office:</b> ${distance.toFixed(2)} km`;
            marker.bindPopup(popupContent).openPopup();
          }

          map.setView([lat1, lon1], 18); 
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

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return <div id="map" style={{ height: height ? height : '400px', width: '100%', borderRadius: '1rem' }}></div>;
};

Map.propTypes = {
  initialAddress: PropTypes.string,
  height: PropTypes.string
};

export default Map;
