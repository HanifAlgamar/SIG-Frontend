'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { APIProvider, Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { PoiMarkers } from '@/components/shared/poimarker';
import { locations } from '../dummydata/data';

export default function Home() {
  return (
    <main className="">
      <div>
        <div className="text-center pt-28">
          <h1 className="text-2xl font-bold">Sistem Informasi Geografis (SIG)</h1>
          <h2>Lokasi Menara Telekomunikasi di Provinsi Nusa Tenggara Barat</h2>
        </div>

        <div className="flex layout flex-col items-center justify-center my-10 mx-4">
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
