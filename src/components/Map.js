import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const GoogleMapComponent = withScriptjs(withGoogleMap(({ lat = 35.6684415, lng = 139.6007828, isMarkerShown }) =>
  <GoogleMap
    defaultZoom={18}
    defaultCenter={{ lat: lat, lng: lng }}
    center={{ lat, lng }}
  >
    { isMarkerShown && <Marker position={{ lat: lat, lng: lng }} />}
  </GoogleMap>
))

export default GoogleMapComponent;