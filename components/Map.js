import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const mapStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '10px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
};


function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  return null;
}

export default function Map({ stores, markerPosition, onMapClick, onStoreClick }) {
  return (
    <div style={mapStyle}>
      <MapContainer
        center={[55.751244, 37.618423]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <MapClickHandler onMapClick={onMapClick} />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        
        {stores.map((store, index) => (
          <Marker
            key={index}
            position={[store.lat, store.lng]}
            eventHandlers={{
              click: () => onStoreClick(store)
            }}
          >
            <Popup>
              <strong>{store.name}</strong><br/>
              {store.address}<br/>
              {store.phone}
            </Popup>
          </Marker>
        ))}
        

        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>Новый магазин будет здесь</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}