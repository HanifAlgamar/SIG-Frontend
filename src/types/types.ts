interface PolygonProperties {
  Lokasi: string;
  Operator: string;
}

interface PolygonFeature {
  type: string;
  properties: PolygonProperties;
  geometry: {
    coordinates: number[][][];
    type: string;
  };
}

interface PolygonData {
  type: string;
  features: PolygonFeature[];
}

interface SelectedPolygon {
  position: google.maps.LatLng;
  properties: PolygonProperties;
}
