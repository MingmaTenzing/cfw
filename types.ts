export interface fuel_brand {
  name: string
  description: string
  svgLogoFileName: string
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
  features: Array<[]>
  address: Address
  brand: fuel_brand
  client: client
  tradingHours: Array<tradingHours>
}
