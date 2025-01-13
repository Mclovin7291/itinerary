import { GoogleMap, Marker, LoadScript, InfoWindow } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import './Styles/Maps.css';

function Maps() {
  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState({
    lat: 33.7531,
    lng: -84.3853
  });

  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  return (
    <div className="map-container">
      <LoadScript googleMapsApiKey="AIzaSyA4vgx9W72b65Pdn-9OMPxH_llPffwriXc">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
        >
          <Marker
            position={center}
            draggable={true}
            onDragEnd={(e) => {
              setCenter({
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
              });
            }}
          />
          {selectedPlace && (
            <InfoWindow
              position={selectedPlace.position}
              onCloseClick={() => setSelectedPlace(null)}
            >
              <div>
                <h3>{selectedPlace.name}</h3>
                <p>{selectedPlace.description}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Maps;