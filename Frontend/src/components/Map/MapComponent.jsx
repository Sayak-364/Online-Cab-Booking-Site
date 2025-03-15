import React, { useState, useEffect, useContext } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import { MapContext } from '../../context/MapContext';

const MapComponent = () => {
  const { coords1, coords2, route } = useContext(MapContext);
  const [viewport, setViewport] = useState({
    latitude: 22.5744,
    longitude: 88.3629,
    zoom: 10,
  });
  const [mapRef, setMapRef] = useState(null);

  useEffect(() => {
    if (coords1?.length >= 2 && coords2?.length >= 2 && mapRef) {
      const bounds = [
        [Math.min(coords1[0], coords2[0]), Math.min(coords1[1], coords2[1])],
        [Math.max(coords1[0], coords2[0]), Math.max(coords1[1], coords2[1])]
      ];

      if (mapRef?.fitBounds) {
        mapRef.fitBounds(bounds, {
          padding: 50,
          duration: 1000,
        });
      }
    }
  }, [coords1, coords2, mapRef]);

  return (
    <div className='p-5 pt-3'>
      <h2 className='text-[18px] font-semibold mb-2'>Map</h2>
      <Map
        ref={(map) => setMapRef(map)}
        initialViewState={viewport}
        style={{ width: '100%', height: 500 }}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/subham-bera/clzbh8la5007l01qwdbdwh8ny"
        onMove={(evt) => setViewport(evt.viewState)}
      >
        {coords1 && (
          <Marker longitude={coords1[0]} latitude={coords1[1]}>
            <div style={{ background: 'red', width: '15px', height: '15px', borderRadius: '50%', border: '2px solid white' }} />
          </Marker>
        )}
        {coords2 && (
          <Marker longitude={coords2[0]} latitude={coords2[1]}>
            <div style={{ background: 'blue', width: '15px', height: '15px', borderRadius: '50%', border: '2px solid white' }} />
          </Marker>
        )}
        {route && (
          <Source id="route" type="geojson" data={route}>
            <Layer
              id="route-layer"
              type="line"
              paint={{
                'line-color': '#1089ff',
                'line-width': 5,
                'line-opacity': 0.75,
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
