import type { Ref } from 'vue'

export interface latlng {
  lat: number
  lng: number
}

export interface SideBarContext {
  show_side_bar: boolean
  toggle_side_bar: () => void
}
export interface googlePolyline_options {
  path: latlng[]
  geodesic: boolean
  strokeColor: string
  strokeOpacity: number
  strokeWeight: number
}
export interface search_props {
  id: string
  name: string
}

export interface fuel_brand {
  name: string
  description: string
  svgLogoFileName: string
}

export interface price_change_predict {
  percentage_change: number
  tomorrow_predicted_price: number
}

export interface apply_filter_boolean_context {
  is_apply_search_filter: Ref<boolean>
  toggle_apply_filter: () => void
}
export interface queryFilterModalContext {
  filter_modal_open_close: boolean
  toggle_modal: () => void
}
export interface queryFilter_context {
  search_details: map_view_search_query
  apply_search_filter: (data: map_view_search_query) => void
}

export interface map_view_search_query {
  suburb: string
  fuelType: string
  brands: string[]
}

export interface fuelwatch_xml {
  title: string
  description: string
  date: string
  trading_name: string
  price: number
  location: string
  address: string
  latitude: string
  longitude: string
  site_features: string
  phone: string
  brand: string
  brand_image: string
}

export interface markerCluster_locations {
  lat: number
  lng: number
}

export interface clientContactDetails {
  phone: string
  isPrimary: boolean
}
export interface client {
  clientName: string
  tradingName: string
  clientContactDetails: Array<clientContactDetails>
}

export interface tradingHours {
  day: string
  startTime: string
  endTime: string
  stationClosedForTrading: boolean
  nextOpeningDayMessage?: string
}
export interface Address {
  id: number
  line1: string
  location: string
  postCode: string
  state: string
  latitude: number
  longitude: number
}

export interface region_average {
  region: string
  average_price: number
}
export interface stationFeatures {
  featureName: string
  description: string
  isAvailable: boolean
  iconName: string
  isCaveatFeature: boolean
}

export interface Product {
  shortName: string
  isTruckStop: boolean
  priceToday: number
  priceTomorrow: number
  isTwoPrice: boolean
}

export interface FuelStation {
  id: number
  siteName: string
  address: Address
  product: Product
  productFuelType: string
  brandName: string
  isClosedNow: boolean
  isClosedAllDayTomorrow: boolean
  drivewayService: string
  manned: boolean
  operates247: boolean
  membershipRequired: boolean
  currentPricingOrder: number
  nextPricingOrder: number
  brand_image?: string
}

export interface site_details {
  id: number
  features: Array<stationFeatures>
  address: Address
  brand: fuel_brand
  client: client
  tradingHours: Array<tradingHours>
}

export interface price_trend {
  averagePrice: number
  publishDate: string
}

export interface fuelwatch_site_details {
  site_details: site_details
  site_price_details: FuelStation[]
}
