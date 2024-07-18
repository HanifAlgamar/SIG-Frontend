'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../../components/ui/input';
import { APIProvider, ControlPosition, MapControl, AdvancedMarker, Map, useMap, useMapsLibrary, useAdvancedMarkerRef, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { PoiMarkers } from '@/components/shared/poimarker';
import { locations } from '../dummydata/data';

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <main className="">
      <div>
        <div className="text-center pt-28">
          <h1 className="text-2xl font-bold">Sistem Informasi Geografis (SIG)</h1>
          <h2>Lokasi Menara Telekomunikasi di Provinsi Nusa Tenggara Barat</h2>
        </div>

        <section className="max-w-7xl mx-auto flex border shadow-md my-10 rounded-md">
          <div className="border-r p-4 text-center">
            <h3 className="font-bold text-xl">Informasi Statistik</h3>
            <div className="border text-white bg-blue-700 rounded-md p-4 mt-4 text-center">
              <p>Jumlah BTS</p>
              <p className="font-bold text-xl">{locations.length}</p>
            </div>
            <div className="border text-white bg-orange-500 rounded-md p-4 mt-4 text-center">
              <p>Lokasi Blankspot</p>
              <p className="font-bold text-xl">0</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <div className="w-full">
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                <Map
                  defaultZoom={13}
                  defaultCenter={{ lat: -8.583333, lng: 116.116667 }}
                  onCameraChanged={(ev: MapCameraChangedEvent) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
                  mapId="semidi2"
                  style={{ width: '1069px', height: '500px' }}
                >
                  <PoiMarkers pois={locations} />
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
        </section>
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
    <div className="autocomplete-container">
      <Input type="text" placeholder="Cari lokasi" className="w-96 shadow-sm focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" ref={inputRef} />
    </div>
  );
};
