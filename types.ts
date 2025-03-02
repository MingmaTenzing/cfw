export interface fuel_detail_item {
  title: string
  description: string
  date: string
  trading_name: string
  price: string
  location: string
  address: string
  latitude: string
  longitude: string
  site_features: string
  phone: string
  brand: string
  brand_image: string
}

export interface fuel_brand {
  name: string
  description: string
  svgLogoFileName: string
}

export interface markerCluster_locations {
  lat: number
  lng: number
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
