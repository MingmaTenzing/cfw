export interface LatLng {
  latitude: number
  longitude: number
}

export interface Location {
  latLng: LatLng
}

export interface Polyline {
  encodedPolyline: string
}

export interface NavigationInstruction {
  maneuver: string
  instructions: string
}

export interface LocalizedValues {
  distance: {
    text: string
  }
  staticDuration: {
    text: string
  }
}

export interface RouteStep {
  distanceMeters: number
  staticDuration: string
  polyline: Polyline
  startLocation: Location
  endLocation: Location
  navigationInstruction: NavigationInstruction
  localizedValues: LocalizedValues
  travelMode: string
}
