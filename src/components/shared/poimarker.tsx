import { useState, useCallback } from 'react';
import { AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';

export interface PoiMenara {
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
  const map = useMap();

  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      map.panTo(ev.latLng);
    },
    [map]
  );

  const handleMarkerClick = (poi: PoiMenara) => (ev: google.maps.MapMouseEvent) => {
    setSelectedPoi(poi);
    handleClick(ev);
  };

  return (
    <>
      {props.pois.map((poi: PoiMenara, index) => (
        <AdvancedMarker key={index} position={{ lat: parseFloat(poi.latitude), lng: parseFloat(poi.longitude) }} onClick={handleMarkerClick(poi)}>
          <Pin background={poi.status == 'Aktif' ? '#1D4ED8' : '#eb3b3b'} glyphColor={'#fff'} borderColor={'#fff'} />
        </AdvancedMarker>
      ))}
      {selectedPoi && (
        <div className="">
          <InfoWindow
            position={{ lat: parseFloat(selectedPoi.latitude), lng: parseFloat(selectedPoi.longitude) }}
            onCloseClick={() => setSelectedPoi(null)}
            headerContent={<span className="font-bold text-base">Informasi Menara Telekomunikasi</span>}
          >
            <div>
              <h3 className="font-bold">{selectedPoi.lokasi}</h3>
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
        </div>
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
  const map = useMap();

  const handleClick = useCallback(
    (ev: google.maps.MapMouseEvent) => {
      if (!map) return;
      if (!ev.latLng) return;
      map.panTo(ev.latLng);
    },
    [map]
  );

  const handleMarkerClick = (poi: BlankSpot) => (ev: google.maps.MapMouseEvent) => {
    setSelectedSpot(poi);
    handleClick(ev);
  };
  return (
    <>
      {props.blankSpots.map((spot: BlankSpot) => (
        <AdvancedMarker onClick={handleMarkerClick(spot)} key={spot.id} position={{ lat: parseFloat(spot.latitude), lng: parseFloat(spot.longitude) }}>
          <div className="relative w-10 h-10 cursor-pointer">
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
