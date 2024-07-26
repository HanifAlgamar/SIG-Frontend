'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { APIProvider, ControlPosition, MapControl, Map, useMap, useMapsLibrary, MapCameraChangedEvent, Marker } from '@vis.gl/react-google-maps';
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/firebase/firebase';
import { DialogTitle } from '@radix-ui/react-dialog';

interface FormData {
  nama: string;
  email: string;
  telepon: string;
  lokasi: string;
  latitude: string;
  longitude: string;
  operator: string;
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
    operator: '',
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
  const [selectOperator, setSelectOperator] = useState<string | null>();
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
      operator: selectOperator,
      keterangan: formData.keterangan,
      imgurl: imageDownloadUrl,
      captcha: captchaValue,
    };

    try {
      const response = await fetch('http://localhost:5000/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        toast.success('Laporan blankspot berhasil dikirimkan');
        setFormData({
          nama: '',
          email: '',
          telepon: '',
          lokasi: '',
          latitude: '',
          longitude: '',
          operator: '',
          keterangan: '',
          imgurl: '',
          captcha: '',
        });

        setSelectOperator('');
        setCaptchaValue(null);
        if (recaptchaRef.current) {
          (recaptchaRef.current as ReCAPTCHA).reset();
        }
        setImageUrl('');
        setFile(null);

        if (inputImage.current) {
          inputImage.current.value = '';
        }
      } else {
        toast.error('Terjadi kesalahan saat mengirimkan laporan');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan saat mengirimkan laporan');
      console.error('Error:', error);
    }

    setIsSubmitting(false);
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
                <Input type="tel" name="telepon" value={formData.telepon} onChange={handleInputChange} placeholder="Nomor telepon yang dapat dihubungi" className="w-full" required />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="lokasi">Lokasi Blankspot</label>
                <Input type="text" name="lokasi" value={formData.lokasi} onChange={handleInputChange} placeholder="Alamat lengkap lokasi blank spot" className="w-full" required />
                <div className="flex justify-between gap-3 mt-1">
                  <Input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} placeholder="Latitude" className="w-full" required />
                  <Input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} placeholder="Longitude" className="w-full" required />
                </div>
                <Dialog>
                  <DialogTrigger className="w-full bg-gradient-to-br from-blue-500 to-blue-600 text-white py-2 rounded-md hover:bg-gradient-to-tr/ hover:bg-opacity-80 transition-colors duration-200">Lihat Peta</DialogTrigger>
                  <DialogContent className="p-4">
                    <DialogTitle>Pilih lokasi dengan drag pointer</DialogTitle>
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                      <Map
                        defaultZoom={13}
                        defaultCenter={{ lat: -8.583333, lng: 116.116667 }}
                        onClick={onMapClick}
                        onCameraChanged={(ev: MapCameraChangedEvent) => console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)}
                        mapId="semidi2"
                        style={{ width: '100%', height: '500px' }}
                        mapTypeControl={false}
                        zoomControl={false}
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
                      </Map>
                      <MapControl position={ControlPosition.TOP}>
                        <div className="autocomplete-control z-50 mt-14">
                          <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                        </div>
                      </MapControl>
                      <MapHandler place={selectedPlace} setFormData={setFormData} />
                    </APIProvider>
                  </DialogContent>
                </Dialog>
               
              </div>
            </div>
            <div className="w-full h-full flex flex-col gap-[0.55rem]">
              <div className="flex flex-col gap-3">
                <label htmlFor="operator">Operator</label>
                <Select required onValueChange={(value) => setSelectOperator(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Operator" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Telkomsel">Telkomsel</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                    <SelectItem value="Indosat">Indosat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="imgurl">Gambar (Jpeg, Png)</label>
                <Input type="file" name="imgurl" onChange={handleFileSelect} placeholder="Foto lokasi blankspot" className="w-full" ref={inputImage} required />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="keterangan">Keterangan</label>
                <Textarea name="keterangan" value={formData.keterangan} onChange={handleInputChange} placeholder="Masukkan keterangan" className="w-full resize-none" rows={11} required />
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
      <Input type="text" placeholder="Cari lokasi" className="w-96 shadow-sm" ref={inputRef} />
    </div>
  );
};
