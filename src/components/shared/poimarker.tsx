import { useState, useCallback, useEffect } from 'react';
import { AdvancedMarker, Pin, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { blankspot } from '@/app/data/blankspots/blankspot';

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
              <h3> <span className="font-bold">Lokasi: </span>{selectedPoi.lokasi}</h3>
              <p>
                <span className="font-bold">Ketinggian: </span> {selectedPoi.ketinggian}
              </p>
              <p>
                <span className="font-bold">Operator: </span> {selectedPoi.operator}
              </p>
              <p>
                <span className="font-bold">Status: </span> {selectedPoi.status}
              </p>
              <p>
                <span className="font-bold">Tipe: </span> {selectedPoi.tipe}
              </p>
              <p>
                <span className="font-bold">Latitude: </span> {selectedPoi.latitude}
              </p>
              <p>
                <span className="font-bold">Longitude: </span>
                {selectedPoi.longitude}
              </p>
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
            <p>
              <span className="font-bold">Operator:</span> {selectedSpot.operator}
            </p>
            <p>
              <span className="font-bold">Latitude:</span> {selectedSpot.latitude}
            </p>
            <p>
              <span className="font-bo">Longitude:</span> {selectedSpot.longitude}
            </p>
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

interface BlankspotProps {
  isVisible: boolean;
}

interface PolygonData {
  features: {
    geometry: {
      coordinates: number[][][];
    };
    properties: {
      Lokasi: string;
      Jumlah_Desa: number;
    };
  }[];
}

interface SelectedPolygon {
  position: google.maps.LatLng;
  properties: {
    Lokasi: string;
    Jumlah_Desa: number;
  };
}

export const Blankspot: React.FC<BlankspotProps> = ({ isVisible }) => {
  const map = useMap();
  const [polygons, setPolygons] = useState<google.maps.Polygon[]>([]);
  const [selectedPolygon, setSelectedPolygon] = useState<SelectedPolygon | null>(null);

  useEffect(() => {
    if (!map) return;

    const newPolygons = (blankspot as PolygonData).features.map((feature) => {
      const paths = feature.geometry.coordinates[0].map((coord) => ({
        lat: coord[1],
        lng: coord[0],
      }));

      const polygon = new google.maps.Polygon({
        paths: paths,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.6,
      });

      polygon.addListener('click', (event: google.maps.PolyMouseEvent) => {
        if (event.latLng) {
          setSelectedPolygon({
            position: event.latLng,
            properties: feature.properties,
          });
        }
      });

      return polygon;
    });

    setPolygons(newPolygons);

    return () => {
      newPolygons.forEach((polygon) => polygon.setMap(null));
    };
  }, [map]);

  useEffect(() => {
    polygons.forEach((polygon) => {
      polygon.setMap(isVisible ? map : null);
    });

    return () => {
      polygons.forEach((polygon) => polygon.setMap(null));
    };
  }, [isVisible, map, polygons]);

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener('click', () => {
      setSelectedPolygon(null);
    });

    return () => {
      google.maps.event.removeListener(listener);
    };
  }, [map]);

  return (
    <>
      {selectedPolygon && (
        <InfoWindow position={selectedPolygon.position} onCloseClick={() => setSelectedPolygon(null)} headerContent={<span className="font-bold text-base">Informasi Blank Spot</span>}>
          <div>
            <h3>
              <span className="font-bold">Lokasi</span>: {selectedPolygon.properties.Lokasi}
            </h3>
            <p>
              <span className="font-bold">Jumlah Desa:</span> {selectedPolygon.properties.Jumlah_Desa}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
};
