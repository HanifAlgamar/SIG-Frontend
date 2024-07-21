import { useState } from 'react';
import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

interface PoiMenara {
  key: string;
  lokasi: string;
  ketinggian: string;
  operator: string;
  status: string;
  tipe: string;
  latitude: string;
  longitude: string;
}

export const PoiMarkersMenara = (props: { pois: PoiMenara[] }) => {
  const [selectedPoi, setSelectedPoi] = useState<PoiMenara | null>(null);

  return (
    <>
      {props.pois.map((poi: PoiMenara, index) => (
        <AdvancedMarker key={index} position={{ lat: parseFloat(poi.latitude), lng: parseFloat(poi.longitude) }} onClick={() => setSelectedPoi(poi)}>
          <Pin background={'#1D4ED8'} glyphColor={'#fff'} borderColor={'#fff'} />
        </AdvancedMarker>
      ))}
      {selectedPoi && (
        <InfoWindow position={{ lat: parseFloat(selectedPoi.latitude), lng: parseFloat(selectedPoi.longitude) }} onCloseClick={() => setSelectedPoi(null)} headerContent={<span className="font-bold text-base">Informasi Menara</span>}>
          <div>
            <h3 style={{ fontWeight: 'bold' }}>{selectedPoi.lokasi}</h3>
            <p>Ketinggian: {selectedPoi.ketinggian}</p>
            <p>Operator: {selectedPoi.operator}</p>
            <p>Status: {selectedPoi.status}</p>
            <p>Tipe: {selectedPoi.tipe}</p>
            <p>Latitude: {selectedPoi.latitude}</p>
            <p>Longitude: {selectedPoi.longitude}</p>
            <button
              onClick={() => window.open(`https://www.google.com/maps?q=${selectedPoi.latitude},${selectedPoi.longitude}`, '_blank')}
              style={{ marginTop: '10px', padding: '5px 10px', background: '#1D4ED8', border: 'none', cursor: 'pointer', borderRadius: '4px', color: '#fff' }}
            >
              Lihat di Maps
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

interface BlankSpot {
  id: string;
  lokasi: string;
  operator: string;
  latitude: string;
  longitude: string;
}

export const BlankSpotMarkers = (props: { blankSpots: BlankSpot[] }) => {
  const [selectedSpot, setSelectedSpot] = useState<BlankSpot | null>(null);

  return (
    <>
      {props.blankSpots.map((spot: BlankSpot) => (
        <AdvancedMarker onClick={() => setSelectedSpot(spot)} key={spot.id} position={{ lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude) }}>
          <div onClick={() => setSelectedSpot(spot)} className="relative w-10 h-10 cursor-pointer">
            <div className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full bg-orange-500 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-10 h-10 rounded-full bg-orange-500 bg-opacity-30 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-blankspot" />
          </div>
        </AdvancedMarker>
      ))}
      {selectedSpot && (
        <InfoWindow position={{ lat: parseFloat(selectedSpot.latitude), lng: parseFloat(selectedSpot.longitude) }} onCloseClick={() => setSelectedSpot(null)} headerContent={<span className="font-bold text-base">Informasi Blank Spot</span>}>
          <div>
            <h3 style={{ fontWeight: 'bold' }}>{selectedSpot.lokasi}</h3>
            <p>Operator: {selectedSpot.operator}</p>
            <p>Latitude: {selectedSpot.latitude}</p>
            <p>Longitude: {selectedSpot.longitude}</p>
            <button
              onClick={() => window.open(`https://www.google.com/maps?q=${selectedSpot.latitude},${selectedSpot.longitude}`, '_blank')}
              style={{ marginTop: '10px', padding: '5px 10px', background: '#F97316', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
            >
              Lihat di Maps
            </button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
