'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { APIProvider, ControlPosition, MapControl, Map, useMap, useMapsLibrary, MapCameraChangedEvent, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

export default function Page() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    telepon: '',
    lokasi: '',
    operator: '',
    keterangan: '',
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChangeCaptcha = (value: any) => {
    setCaptchaValue(value);
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== '') && captchaValue;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!isFormValid()) return;

    try {
      const response = await fetch('http://localhost:5000/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Laporan berhasil dikirim!');
        // Reset form after successful submission
        setFormData({
          nama: '',
          email: '',
          telepon: '',
          lokasi: '',
          operator: '',
          keterangan: '',
        });
        setCaptchaValue(null);
      } else {
        alert('Terjadi kesalahan saat mengirim laporan.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mengirim laporan.');
    }
  };

  return (
    <div className="pt-28 layout min-h-screen ">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Laporan Lokasi Blank Spot</h1>
        <h2>Lengkapi data berikut untuk melaporkan lokasi atau daerah blank spot</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-md shadow-md my-10">
          <div className="flex md:flex-row flex-col w-full gap-5">
            <div className="flex flex-col gap-[0.55rem] w-full">
              <div className="flex flex-col gap-3">
                <label htmlFor="nama">Nama</label>
                <Input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Alamat email aktif Anda"
                  className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="telepon">Telepon</label>
                <Input
                  type="tel"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleInputChange}
                  placeholder="Nomor telepon yang dapat dihubungi"
                  className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="lokasi">Lokasi</label>
                <Input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleInputChange}
                  placeholder="Alamat lengkap lokasi blank spot"
                  className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150"
                />
                <Dialog>
                  <DialogTrigger className="bg-[#FBD46D] mt-1 hover:bg-[#fdde8a] text-black py-2 rounded-md">Lihat Peta</DialogTrigger>
                  <DialogContent className='p-4'>
                    {/* Disini Google Maps */}
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                      <Map
                        defaultZoom={13}
                        defaultCenter={{ lat: -8.583333, lng: 116.116667 }}
                        onCameraChanged={(ev: MapCameraChangedEvent) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
                        mapId="semidi2"
                        style={{ width: '100%', height: '400px' }}
                        mapTypeControlOptions={{ position: ControlPosition.BOTTOM_LEFT }}
                      ></Map>
                      <MapControl position={ControlPosition.TOP}>
                        <div className="autocomplete-control mt-14">
                          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                        </div>
                      </MapControl>
                      <MapHandler place={selectedPlace} marker={marker} />
                    </APIProvider>
                  </DialogContent>
                </Dialog>
                <div className="flex justify-between gap-3 mt-1">
                  <Input type="text" name="latitude" value={formData.lokasi} onChange={handleInputChange} placeholder="Latitude" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
                  <Input type="text" name="longitude" value={formData.lokasi} onChange={handleInputChange} placeholder="longtitude" className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150" />
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <div className="flex flex-col gap-3">
                <label htmlFor="operator">Operator</label>
                <Input
                  type="text"
                  name="operator"
                  value={formData.operator}
                  onChange={handleInputChange}
                  placeholder="Nama operator seluler (Telkomsel, XL, Indosat, dll.)"
                  className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150"
                />
              </div>
              <div className="flex flex-col gap-3 mt-3">
                <label htmlFor="keterangan">Keterangan</label>
                <Textarea
                  name="keterangan"
                  value={formData.keterangan}
                  onChange={handleInputChange}
                  placeholder="Masukkan keterangan"
                  className="w-full focus:border-[#FBD46D] focus:outline-none outline-none transition-all duration-150"
                  rows={15}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''} onChange={onChangeCaptcha} />
          </div>
          <div>
            <Button className="w-full bg-[#002E5B] hover:bg-[#1a4167] my-5 disabled:bg-opacity-75 disabled:cursor-not-allowed" type="submit" disabled={!isFormValid()}>
              Kirim
            </Button>
          </div>
        </form>
      </div>
    </div>
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
