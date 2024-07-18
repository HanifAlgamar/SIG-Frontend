// Define Poi with additional tower information
export type Poi = {
    key: string;
    location: google.maps.LatLngLiteral;
    lokasi: string;
    ketinggian: string;
    operator: string;
    status: string;
    tipe: string;
};


export const locations: Poi[] = [
    { key: 'mataram', location: { lat: -8.583333, lng: 116.116667 }, lokasi: 'Mataram, Kota Mataram, NTB', ketinggian: '30m', operator: 'Telkomsel', status: 'Aktif', tipe: 'BTS' },
    { key: 'lombokInternationalAirport', location: { lat: -8.757322, lng: 116.276282 }, lokasi: 'Lombok International Airport, Praya, Lombok Tengah, NTB', ketinggian: '50m', operator: 'XL', status: 'Aktif', tipe: 'BTS' },
    { key: 'senggigiBeach', location: { lat: -8.485534, lng: 116.044834 }, lokasi: 'Senggigi Beach, Batu Layar, Lombok Barat, NTB', ketinggian: '40m', operator: 'Indosat', status: 'Tidak Aktif', tipe: 'BTS' },
    { key: 'giliTrawangan', location: { lat: -8.353512, lng: 116.040326 }, lokasi: 'Gili Trawangan, Pemenang, Lombok Utara, NTB', ketinggian: '35m', operator: 'Telkomsel', status: 'Aktif', tipe: 'BTS' },
    { key: 'kutaBeachLombok', location: { lat: -8.895301, lng: 116.285072 }, lokasi: 'Kuta Beach Lombok, Pujut, Lombok Tengah, NTB', ketinggian: '45m', operator: 'XL', status: 'Aktif', tipe: 'BTS' },
    { key: 'mountRinjani', location: { lat: -8.411105, lng: 116.457575 }, lokasi: 'Mount Rinjani, Sembalun, Lombok Timur, NTB', ketinggian: '60m', operator: 'Indosat', status: 'Tidak Aktif', tipe: 'BTS' },
    { key: 'sumbawaBesar', location: { lat: -8.500122, lng: 117.425743 }, lokasi: 'Sumbawa Besar, Sumbawa, NTB', ketinggian: '50m', operator: 'Telkomsel', status: 'Aktif', tipe: 'BTS' },
    { key: 'bima', location: { lat: -8.458236, lng: 118.726872 }, lokasi: 'Bima, Kota Bima, NTB', ketinggian: '55m', operator: 'XL', status: 'Tidak Aktif', tipe: 'BTS' },
    { key: 'taliwang', location: { lat: -8.844972, lng: 116.938696 }, lokasi: 'Taliwang, Sumbawa Barat, NTB', ketinggian: '45m', operator: 'Indosat', status: 'Aktif', tipe: 'BTS' },
    { key: 'dompu', location: { lat: -8.536571, lng: 118.460679 }, lokasi: 'Dompu, Dompu, NTB', ketinggian: '50m', operator: 'Telkomsel', status: 'Aktif', tipe: 'BTS' },
    { key: 'praya', location: { lat: -8.706269, lng: 116.278927 }, lokasi: 'Praya, Lombok Tengah, NTB', ketinggian: '45m', operator: 'XL', status: 'Tidak Aktif', tipe: 'BTS' },
    { key: 'selong', location: { lat: -8.644081, lng: 116.530201 }, lokasi: 'Selong, Lombok Timur, NTB', ketinggian: '50m', operator: 'Indosat', status: 'Aktif', tipe: 'BTS' },
    { key: 'gerung', location: { lat: -8.643968, lng: 116.102234 }, lokasi: 'Gerung, Lombok Barat, NTB', ketinggian: '40m', operator: 'Telkomsel', status: 'Aktif', tipe: 'BTS' },
    { key: 'giliAir', location: { lat: -8.361867, lng: 116.071732 }, lokasi: 'Gili Air, Pemenang, Lombok Utara, NTB', ketinggian: '35m', operator: 'XL', status: 'Aktif', tipe: 'BTS' },
    { key: 'giliMeno', location: { lat: -8.3627, lng: 116.0616 }, lokasi: 'Gili Meno, Pemenang, Lombok Utara, NTB', ketinggian: '35m', operator: 'Indosat', status: 'Aktif', tipe: 'BTS' },
    { key: 'bayan', location: { lat: -8.2917, lng: 116.4058 }, lokasi: 'Bayan, Lombok Utara, NTB', ketinggian: '50m', operator: 'Telkomsel', status: 'Aktif', tipe: 'BTS' },
    { key: 'janapria', location: { lat: -8.7692, lng: 116.3657 }, lokasi: 'Janapria, Lombok Tengah, NTB', ketinggian: '45m', operator: 'XL', status: 'Aktif', tipe: 'BTS' },
    { key: 'meninting', location: { lat: -8.551338509010833, lng: 116.07328145074429 }, lokasi: 'Meninting, Batu Layar, Lombok Barat, NTB', ketinggian: '40m', operator: 'Indosat', status: 'Aktif', tipe: 'BTS' },
  ];
  