'use client';

import { APIProvider, Map, MapCameraChangedEvent, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
// import PoiMarkers from '@/components/shared/poimarkers';
type Poi = { key: string; location: google.maps.LatLngLiteral };

const locations: Poi[] = [{ key: 'operaHouse', location: { lat: -8.57592898824253, lng: 116.08525450287468 } }];

const PoiMarkers = (props: { pois: Poi[] }) => {
  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default function Home() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  return (
    <main className="">
      <div>
        <div className="text-center pt-28">
          <h1 className="text-2xl font-bold">Sistem Informasi Geografis (SIG)</h1>
          <h2>Lokasi Menara Telekomunikasi di Provinsi Nusa Tenggara Barat</h2>
        </div>

        <div className="mt-11 w-full">
          <div className="flex justify-center mx-4 rounded-md">
            <APIProvider apiKey={'AIzaSyAL_FYExY5v0iWXPcpibLiZKSBDhyciLhA'}>
              <Map
                defaultZoom={13}
                defaultCenter={{ lat: -8.591878340772793, lng: 476.1110037094176 }}
                onCameraChanged={(ev: MapCameraChangedEvent) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
                style={{ width: '1000px', height: '400px', borderRadius: '10px' }}
              >
                <PoiMarkers pois={locations} />
              </Map>
            </APIProvider>
          </div>
        </div>

        <div>tabl</div>
      </div>
    </main>
  );
}
