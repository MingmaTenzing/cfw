interface LatLng {
  latitude: number
  longitude: number
}

interface Polyline {
  encodedPolyline: string
}

interface LocalizedValue {
  text: string
}

interface LocalizedValues {
  distance?: LocalizedValue
  duration?: LocalizedValue
  staticDuration?: LocalizedValue
}

interface NavigationInstruction {
  maneuver?: string
  instructions?: string
}

interface Step {
  distanceMeters: number
  staticDuration: string
  polyline: Polyline
  startLocation: {
    latLng: LatLng
  }
  endLocation: {
    latLng: LatLng
  }
  navigationInstruction?: NavigationInstruction
  localizedValues?: LocalizedValues
  travelMode?: string
}

interface Leg {
  distanceMeters: number
  duration: string
  staticDuration: string
  polyline: Polyline
  startLocation: {
    latLng: LatLng
  }
  endLocation: {
    latLng: LatLng
  }
  steps: Step[]
  localizedValues?: LocalizedValues
}

interface Route {
  legs: Leg[]
  distanceMeters: number
  duration: string
  polyline: Polyline
}

export interface RoutesResponse {
  routes: Route[]
}
