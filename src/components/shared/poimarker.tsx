import { Poi } from '../../app/dummydata/data';
import { useState } from 'react';
import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

export const PoiMarkers = (props: { pois: Poi[] }) => {
  const [selectedPoi, setSelectedPoi] = useState<Poi | null>(null);

  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker key={poi.key} position={poi.location} onClick={() => setSelectedPoi(poi)}>
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
      {selectedPoi && (
        <InfoWindow position={selectedPoi.location} onCloseClick={() => setSelectedPoi(null)} headerContent={<span className="font-bold text-base">Informasi Menara</span>}>
          <div>
            <h3 style={{ fontWeight: 'bold' }}>{selectedPoi.lokasi}</h3>
            <p>Ketinggian: {selectedPoi.ketinggian}</p>
            <p>Operator: {selectedPoi.operator}</p>
            <p>Status: {selectedPoi.status}</p>
            <p>Tipe: {selectedPoi.tipe}</p>
            <p>Latitude: {selectedPoi.location.lat}</p>
            <p>Longitude: {selectedPoi.location.lng}</p>
            <button
              onClick={() => window.open(`https://www.google.com/maps?q=${selectedPoi.location.lat},${selectedPoi.location.lng}`, '_blank')}
              style={{ marginTop: '10px', padding: '5px 10px', background: '#FBBC04', border: 'none', cursor: 'pointer' }}
            >
              Lihat di Maps
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};