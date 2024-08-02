'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';
import { APIProvider, ControlPosition, MapControl, Map, useMap, useMapsLibrary, Marker } from '@vis.gl/react-google-maps';
import toast from 'react-hot-toast';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Modal } from 'flowbite-react';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/firebase/firebase';

interface FormData {
  nama: string;
  email: string;
  telepon: string;
  lokasi: string;
  latitude: string;
  longitude: string;
  keterangan: string;
  imgurl: string;
  captcha: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    nama: '',
    email: '',
    telepon: '',
    lokasi: '',
    latitude: '',
    longitude: '',
    keterangan: '',
    imgurl: '',
    captcha: '',
  });
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [markerPosition, setMarkerPosition] = useState({ lat: -8.583333, lng: 116.116667 });
  const [isSubmit, setIsSubmitting] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [openMaps, setOpenMaps] = useState(false);
  const inputImage = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChangeCaptcha = (value: string | null) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaValue) {
      toast('Mohon untuk melengkapi CAPTCHA', {
        icon: '⚠️',
      });
      return;
    }

    setIsSubmitting(true);

    const idImage = uuidv4();
    const imageName = `${idImage}-${file?.name}`;
    let imageDownloadUrl = imageUrl;

    if (file) {
      const fileRef = ref(storage, `report-image/${imageName}`);
      await uploadBytes(fileRef, file);
      imageDownloadUrl = await getDownloadURL(fileRef);
    }

    const dataToSend = {
      nama: formData.nama,
      email: formData.email,
      telepon: formData.telepon,
      lokasi: formData.lokasi,
      latitude: formData.latitude,
      longitude: formData.longitude,
      keterangan: formData.keterangan,
      imgurl: imageDownloadUrl,
      captcha: captchaValue,
    };

    toast.promise(submitReport(dataToSend), {
      loading: 'Mengirim laporan...',
      success: 'Laporan blankspot berhasil dikirimkan',
      error: 'Terjadi kesalahan saat mengirimkan laporan',
    });

    setIsSubmitting(false);
  };

  const submitReport = async (dataToSend: any) => {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error('Gagal mengirim laporan');
    }

    setFormData({
      nama: '',
      email: '',
      telepon: '',
      lokasi: '',
      latitude: '',
      longitude: '',
      keterangan: '',
      imgurl: '',
      captcha: '',
    });

    setCaptchaValue(null);
    if (recaptchaRef.current) {
      (recaptchaRef.current as ReCAPTCHA).reset();
    }
    setImageUrl('');
    setFile(null);

    if (inputImage.current) {
      inputImage.current.value = '';
    }

    return response.json();
  };

  const onMapClick = (e: any) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarkerPosition({ lat, lng });
      setFormData((prevData) => ({
        ...prevData,
        latitude: lat.toString(),
        longitude: lng.toString(),
      }));
    }
  };

  useEffect(() => {
    if (selectedPlace?.geometry?.location) {
      const lat = selectedPlace.geometry.location.lat();
      const lng = selectedPlace.geometry.location.lng();
      setMarkerPosition({ lat, lng });
      setFormData((prevData) => ({
        ...prevData,
        lokasi: selectedPlace.formatted_address || '',
        latitude: lat.toString(),
        longitude: lng.toString(),
      }));
    }
  }, [selectedPlace]);

  return (
    <div className="pt-28 layout min-h-screen">
      <div className="text-center">
        <h1 className="font-bold text-2xl">Laporan Lokasi Blank Spot</h1>
        <h2>Lengkapi data berikut untuk melaporkan lokasi atau daerah blankspot</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-md shadow-md my-10">
          <div className="flex md:flex-row flex-col w-full gap-5">
            <div className="flex flex-col gap-[0.55rem] w-full">
              <div className="flex flex-col gap-3">
                <label htmlFor="nama">Nama</label>
                <Input type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="Masukkan nama lengkap Anda" className="w-full" required />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <Input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Alamat email aktif Anda" className="w-full" required />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="telepon">Telepon</label>
                <Input type="text" inputMode="numeric" name="telepon" value={formData.telepon} onChange={handleInputChange} placeholder="Nomor telepon yang dapat dihubungi" className="w-full" required />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="lokasi">Lokasi Blankspot</label>
                <Input type="text" name="lokasi" value={formData.lokasi} onChange={handleInputChange} placeholder="Alamat lengkap lokasi blank spot" className="w-full" required />
                <div className="flex justify-between gap-3 mt-1">
                  <Input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} placeholder="Latitude" className="w-full" required />
                  <Input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} placeholder="Longitude" className="w-full" required />
                </div>

                <Button onClick={() => setOpenMaps(true)} type="button" className="bg-gradient-to-br hover:bg-blue-400 w-full from-blue-500 to-blue-600">
                  Lihat Maps
                </Button>
                <Modal show={openMaps} onClose={() => setOpenMaps(false)} className="bg-black/50 mx-auto" size={'5xl'}>
                  <Modal.Header>Cari Lokasi</Modal.Header>
                  <Modal.Body>
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                      <Map
                        defaultZoom={10}
                        defaultCenter={{ lat: -8.583333, lng: 116.116667 }}
                        onClick={onMapClick}
                        mapId="semidi2"
                        style={{ width: '100%', height: '480px' }}
                        mapTypeControl={false}
                        fullscreenControl={false}
                        streetViewControl={false}
                      >
                        <Marker
                          position={markerPosition}
                          draggable={true}
                          onDragEnd={(e) => {
                            if (e.latLng) {
                              const lat = e.latLng.lat();
                              const lng = e.latLng.lng();
                              setMarkerPosition({ lat, lng });
                              setFormData((prevData) => ({
                                ...prevData,
                                latitude: lat.toString(),
                                longitude: lng.toString(),
                              }));
                            }
                          }}
                        />
                        <MapControl position={ControlPosition.TOP}>
                          <div className="autocomplete-control mt-14">
                            <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                          </div>
                        </MapControl>
                        <MapHandler place={selectedPlace} setFormData={setFormData} />
                      </Map>
                    </APIProvider>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-[0.55rem]">
              <div className="flex flex-col gap-3">
                <label htmlFor="imgurl">Foto Lokasi</label>
                <input name="imgurl" type="file" onChange={handleFileSelect} placeholder="Foto lokasi blankspot" className="w-full bg-white border rounded-md file:bg-blue-600 file:text-white upload-image" ref={inputImage} required />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="keterangan">Keterangan</label>
                <Textarea name="keterangan" value={formData.keterangan} onChange={handleInputChange} placeholder="Masukkan keterangan" className="w-full resize-none" rows={12} required />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_SITE_KEY || ''} onChange={onChangeCaptcha} ref={recaptchaRef} />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <Button className="bg-gradient-to-br hover:bg-blue-400 w-full from-blue-500 to-blue-600 my-5 disabled:bg-opacity-75 disabled:cursor-not-allowed" type="submit" disabled={isSubmit}>
              Kirim Laporan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const MapHandler = ({ place, setFormData }: MapHandlerProps) => {
  const map = useMap();
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (!map || !place) return;

    if (marker) {
      marker.setMap(null);
    }

    const newMarker = new google.maps.Marker({
      position: place.geometry?.location,
      map,
      draggable: true,
    });

    setMarker(newMarker);

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else if (place.geometry?.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(15);
    }

    newMarker.addListener('dragend', (e: any) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setFormData((prevData) => ({
          ...prevData,
          latitude: lat.toString(),
          longitude: lng.toString(),
        }));
      }
    });
  }, [map, place, marker, setFormData]);

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
      <Input type="text" placeholder="Cari lokasi" className="sm:w-96 w-72 shadow-sm" ref={inputRef} />
    </div>
  );
};
