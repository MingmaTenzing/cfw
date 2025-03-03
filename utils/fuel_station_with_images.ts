import { type FuelStation } from '../types'
import { fuel_brands } from './fuel_brands'

export const fuel_station_image_mapper = (fuel_stations: FuelStation[]) => {
  const stations_details = fuel_stations.map((item) => {
    const find_brand = fuel_brands.find((brand) => brand!.name == item.brandName)
    if (find_brand) {
      return {
        ...item,
        brand_image: 'https://www.fuelwatch.wa.gov.au/assets/images/' + find_brand.svgLogoFileName,
      }
    }
    return item
  })

  return stations_details
}
