export interface map_props {
  center: {
    lat: number
    lng: number
  }
  update_center(lat: number, lng: number): undefined
}
