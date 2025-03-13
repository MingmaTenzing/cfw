import axios from 'axios'
import { fuel_data_parser } from './xml_fuel_data_parser'
export const cheapest_fuel_station = async () => {
  const [metro_north, metro_south] = await Promise.all([
    axios.get(
      'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=25',
    ),
    axios.get(
      'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=26',
    ),
  ])

  const parse_metro_north_xml_data = fuel_data_parser(metro_north.data)
  let north_smallest_price = parse_metro_north_xml_data[0]

  for (let i = 0; i < parse_metro_north_xml_data.length; i++)
    if (north_smallest_price > parse_metro_north_xml_data[i + 1]) {
      north_smallest_price = parse_metro_north_xml_data[i + 1]
    }

  const parse_metro_south_xml_data = fuel_data_parser(metro_south.data)
  let south_smallest_price = parse_metro_south_xml_data[0]

  for (let i = 0; i < parse_metro_south_xml_data.length; i++)
    if (south_smallest_price > parse_metro_south_xml_data[i + 1]) {
      south_smallest_price = parse_metro_south_xml_data[i + 1]
    }

  return [north_smallest_price, south_smallest_price]
}
