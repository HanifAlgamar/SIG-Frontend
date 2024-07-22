'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { APIProvider, ControlPosition, MapControl, AdvancedMarker, Map, useMap, useMapsLibrary, useAdvancedMarkerRef, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { BlankSpotMarkers, PoiMarkersMenara } from '@/components/shared/poimarker';
import PieChart from '@/components/shared/piechart';
import { Layers2 } from 'lucide-react';

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpenMenu, setOpenMenu] = useState(false);
  const [isCheckedMenara, setCheckedMenara] = useState(false);
  const [isCheckedBlankspot, setCheckedBlankspot] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const dummyBlankSpots = [
    {
      id: 'bs001',
      lokasi: 'Desa Sekotong Barat, Kabupaten Lombok Barat',
      operator: 'XL, Telkomsel',
      latitude: '-8.7544',
      longitude: '115.9894',
    },
    {
      id: 'bs002',
      lokasi: 'Desa Batu Layar, Kabupaten Lombok Barat',
      operator: 'Indosat, Telkomsel',
      latitude: '-8.5650',
      longitude: '116.0498',
    },
    {
      id: 'bs003',
      lokasi: 'Desa Pemenang Barat, Kabupaten Lombok Utara',
      operator: 'XL, Indosat',
      latitude: '-8.4059',
      longitude: '116.0696',
    },
    {
      id: 'bs004',
      lokasi: 'Desa Jeringo, Kabupaten Lombok Timur',
      operator: 'Telkomsel, Indosat',
      latitude: '-8.6834',
      longitude: '116.5249',
    },
    {
      id: 'bs005',
      lokasi: 'Desa Plampang, Kabupaten Sumbawa',
      operator: 'XL, Telkomsel',
      latitude: '-8.8079',
      longitude: '117.7863',
    },
  ];

  return (
    <main className="max-h-screen pt-[4rem]">
      <div className="border-r ms-3 mt-16 rounded-md max-h-[30rem] overflow-hidden p-4 text-center md:w-72 absolute z-20 bg-white shadow-sm ">
        <div className="flex gap-4 items-center">
          <Layers2 />
          <p className="font-bold text-xl">Layer Control</p>
        </div>

        <div className="max-h-[25rem] overflow-y-auto filter">
          <div className="mt-4">
            <div className="py-1.5 font-bold w-full text-left border-b mb-4">Jenis Penanda</div>
            <div className="flex gap-4 items-center">
              <input type="checkbox" onChange={() => setCheckedMenara(!isCheckedMenara)} />
              <p>Menara Telekomunikasi</p>
            </div>
            <div className="flex gap-4 items-center mt-3">
              <input type="checkbox" onChange={() => setCheckedBlankspot(!isCheckedBlankspot)} />
              <p>Lokasi Blankspot</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="py-1.5 font-bold w-full text-left border-b mb-4">Oprator Menara</div>
            <div className="flex gap-4 items-center">
              <input type="checkbox" onChange={() => setCheckedMenara(!isCheckedMenara)} />
              <p>Telkomsel</p>
            </div>
            <div className="flex gap-4 items-center mt-3">
              <input type="checkbox" onChange={() => setCheckedBlankspot(!isCheckedBlankspot)} />
              <p>XL</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="py-1.5 font-bold w-full text-left border-b mb-4">Status Menara</div>
            <div className="flex gap-4 items-center">
              <input type="checkbox" onChange={() => setCheckedMenara(!isCheckedMenara)} />
              <p>Aktif</p>
            </div>
            <div className="flex gap-4 items-center mt-3">
              <input type="checkbox" onChange={() => setCheckedBlankspot(!isCheckedBlankspot)} />
              <p>Tidak Aktif</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="py-1.5 font-bold w-full text-left border-b mb-4">Status Menara</div>
            <div className="flex gap-4 items-center">
              <input type="checkbox" onChange={() => setCheckedMenara(!isCheckedMenara)} />
              <p>Aktif</p>
            </div>
            <div className="flex gap-4 items-center mt-3">
              <input type="checkbox" onChange={() => setCheckedBlankspot(!isCheckedBlankspot)} />
              <p>Tidak Aktif</p>
            </div>
          </div>
        </div>
        {/* <h3 className="font-bold text-xl">Informasi Statistik</h3>
        <div className="border text-white bg-blue-700 rounded-md p-4 mt-4 text-center">
          <p>Menara Telekomunikasi</p>
          <p className="font-bold text-xl">{data.length}</p>
        </div>
        <div className="border text-white bg-orange-500 rounded-md p-4 mt-4 text-center">
          <p>Lokasi Blankspot</p>
          <p className="font-bold text-xl">{dummyBlankSpots.length}</p>
        </div> */}
        {/* <div className="mt-6 flex justify-center">
          <PieChart jumlahBTS={data.length} lokasiBlankspot={dummyBlankSpots.length} />
        </div> */}
      </div>
      <div>
        <div className="w-full mx-auto -z-10 fixed">
          <div className="w-full">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
              <Map
                defaultZoom={13}
                defaultCenter={{ lat: -8.583333, lng: 116.116667 }}
                onCameraChanged={(ev: MapCameraChangedEvent) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
                mapId="semidi2"
                style={{ width: '100%', height: '600px' }}
              >
                {isCheckedMenara && <PoiMarkersMenara pois={data} />}
                {isCheckedBlankspot && <BlankSpotMarkers blankSpots={dummyBlankSpots} />}
                <AdvancedMarker ref={markerRef} position={null} />
              </Map>
              <MapControl position={ControlPosition.TOP}>
                <div className="autocomplete-control mt-6">
                  <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                </div>
              </MapControl>
              <MapHandler place={selectedPlace} marker={marker} />
            </APIProvider>
          </div>
        </div>
      </div>
    </main>
  );
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else if (place.geometry?.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({ onPlaceSelect }: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="autocomplete-container mt-16">
      <Input type="text" placeholder="Cari lokasi" className="w-96 shadow-sm focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" ref={inputRef} />
    </div>
  );
};
