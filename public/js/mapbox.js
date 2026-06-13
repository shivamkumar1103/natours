/* eslint-disable */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix marker icons when bundling with webpack/parcel
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/img/leaflet/marker-icon-2x.png',
  iconUrl: '/img/leaflet/marker-icon.png',
  shadowUrl: '/img/leaflet/marker-shadow.png',
});

export const displayMap = (locations) => {
  // Create map
  const map = L.map('map', {
    scrollWheelZoom: false,
  });

  // OpenStreetMap tiles
  L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  const bounds = [];
  const markers = [];

  locations.forEach((loc) => {
    const lat = loc.coordinates[1];
    const lng = loc.coordinates[0];

    bounds.push([lat, lng]);

    const marker = L.marker([lat, lng]).addTo(map);

    marker.bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
      offset: [0, -40], // shift up from marker
      className: 'mapboxgl-popup',
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
    });

    markers.push(marker);
  });

  // Fit all markers
  if (bounds.length > 0) {
    map.fitBounds(bounds, {
      padding: [100, 100],
    });
  }
  // Open all popups when map is ready
  map.whenReady(() => {
    markers.forEach((marker) => marker.openPopup());
  });

  // Force Leaflet to recalculate dimensions
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
};
