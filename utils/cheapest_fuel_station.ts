import axios from 'axios'
import { fuel_data_parser } from './xml_fuel_data_parser'
export const cheapest_fuel_station = async () => {
  const { data } = await axios.get(
    'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=25',
  )

  const parsed_xml_data = fuel_data_parser(data)

  let smallest_price = parsed_xml_data[0]

  for (let i = 0; i < parsed_xml_data.length; i++)
    if (smallest_price > parsed_xml_data[i + 1]) {
      smallest_price = parsed_xml_data[i + 1]
    }

  return smallest_price
}
