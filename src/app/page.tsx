'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { APIProvider, Map, MapCameraChangedEvent, Pin, AdvancedMarker } from '@vis.gl/react-google-maps';

type Poi = { key: string; location: google.maps.LatLngLiteral };
const locations: Poi[] = [
  { key: 'mataram', location: { lat: -8.583333, lng: 116.116667 } },
  { key: 'lombokInternationalAirport', location: { lat: -8.757322, lng: 116.276282 } },
  { key: 'senggigiBeach', location: { lat: -8.485534, lng: 116.044834 } },
  { key: 'giliTrawangan', location: { lat: -8.353512, lng: 116.040326 } },
  { key: 'kutaBeachLombok', location: { lat: -8.895301, lng: 116.285072 } },
  { key: 'mountRinjani', location: { lat: -8.411105, lng: 116.457575 } },
  { key: 'sumbawaBesar', location: { lat: -8.500122, lng: 117.425743 } },
  { key: 'bima', location: { lat: -8.458236, lng: 118.726872 } },
  { key: 'taliwang', location: { lat: -8.844972, lng: 116.938696 } },
  { key: 'dompu', location: { lat: -8.536571, lng: 118.460679 } },
  { key: 'praya', location: { lat: -8.706269, lng: 116.278927 } },
  { key: 'selong', location: { lat: -8.644081, lng: 116.530201 } },
  { key: 'gerung', location: { lat: -8.643968, lng: 116.102234 } },
  { key: 'giliAir', location: { lat: -8.361867, lng: 116.071732 } },
  { key: 'giliMeno', location: { lat: -8.3627, lng: 116.0616 } },
  { key: 'bayan', location: { lat: -8.2917, lng: 116.4058 } },
  { key: 'janapria', location: { lat: -8.7692, lng: 116.3657 } },
  { key: 'meninting', location: { lat: -8.5795, lng: 116.0791 } },
];

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
  return (
    <main className="">
      <div>
        <div className="text-center pt-28">
          <h1 className="text-2xl font-bold">Sistem Informasi Geografis (SIG)</h1>
          <h2>Lokasi Menara Telekomunikasi di Provinsi Nusa Tenggara Barat</h2>
        </div>

        <div className="flex  layout flex-col items-center justify-center my-10 mx-4">
          <div className="mb-3 justify-items-end w-full max-w-5xl">
            <label htmlFor="search">Cari Lokasi Menara</label>
            <div className="flex gap-4 mt-3 w-full">
              <Input type="text" placeholder="Cari lokasi berdasarkan nama kota" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
              <Button className="bg-[#002E5B]">
                <Search />
              </Button>
            </div>
          </div>
          <div className="w-full max-w-5xl">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
              <Map
                defaultZoom={13}
                defaultCenter={{ lat: -8.583333, lng: 116.116667 }}
                onCameraChanged={(ev: MapCameraChangedEvent) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
                mapId="DEMO_MAP_ID"
                style={{ width: '100%', height: '400px' }}
              >
                <PoiMarkers pois={locations} />
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
