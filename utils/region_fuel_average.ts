import axios from 'axios'
import { fuel_data_parser } from './xml_fuel_data_parser'

export const region_fuel_average_calculator = async () => {
  let total_metro_average = 0
  let total_albany_average = 0
  let total_margaret_river_average = 0
  let total_bunbury_average = 0

  const [Metro, Albany, Margaret_River, Bunbury] = await Promise.all([
    axios.get(
      'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=25',
    ),
    axios.get(
      'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=15',
    ),
    axios.get(
      'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=28',
    ),
    axios.get(
      'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=16',
    ),
  ])
  const metro_data_xml_parser = fuel_data_parser(Metro.data)
  const albany_xml_parser = fuel_data_parser(Albany.data)
  const margaret_river_xml_parser = fuel_data_parser(Margaret_River.data)
  const bunbury_xml_parser = fuel_data_parser(Bunbury.data)

  for (let i = 0; i < metro_data_xml_parser.length; i++) {
    total_metro_average += Number(metro_data_xml_parser[i].price)
  }
  for (let i = 0; i < albany_xml_parser.length; i++) {
    total_albany_average += Number(metro_data_xml_parser[i].price)
  }
  for (let i = 0; i < margaret_river_xml_parser.length; i++) {
    total_margaret_river_average += Number(metro_data_xml_parser[i].price)
  }
  for (let i = 0; i < bunbury_xml_parser.length; i++) {
    total_bunbury_average += Number(metro_data_xml_parser[i].price)
  }
  return [
    parseFloat((total_metro_average / metro_data_xml_parser.length / 100).toFixed(2)),
    parseFloat((total_margaret_river_average / margaret_river_xml_parser.length / 100).toFixed(2)),
    parseFloat((total_albany_average / albany_xml_parser.length / 100).toFixed(2)),
    parseFloat((total_bunbury_average / bunbury_xml_parser.length / 100).toFixed(2)),
  ]
}
