import * as L from 'leaflet';

export function createCustomIcon(color: string, label: string): L.DivIcon {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="flex items-center space-x-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ${color}" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9a2 2 0 110-4 2 2 0 010 4z"/>
        </svg>
        <span class="text-black font-semibold text-xs bg-white bg-opacity-80 px-1 rounded">${label}</span>
      </div>
    `,
    iconSize: [120, 24],
    iconAnchor: [0, 12]
  });
}

export function initTripMap(containerId: string, pickup: any, dropoff: any): L.Map {
  const map = L.map(containerId, {
    center: [pickup.lat, pickup.lng],
    zoom: 13,
    zoomControl: false,
    attributionControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  const pickupIcon = createCustomIcon('text-4xl text-green-500', pickup.label);
  L.marker([pickup.lat, pickup.lng], { icon: pickupIcon }).addTo(map);

  const dropoffIcon = createCustomIcon('text-4xl text-red-500', dropoff.label);
  L.marker([dropoff.lat, dropoff.lng], { icon: dropoffIcon }).addTo(map);

  const bounds = L.latLngBounds([
    [pickup.lat, pickup.lng],
    [dropoff.lat, dropoff.lng]
  ]);
  map.fitBounds(bounds, { padding: [50, 50] });

  return map;
}
