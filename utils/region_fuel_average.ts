import axios from 'axios'
import { fuel_data_parser } from './xml_fuel_data_parser'

export const region_fuel_average_calculator = async () => {
  let total_metro_north = 0
  let total_metro_south = 0
  let total_albany = 0
  let total_margaret_river = 0
  let total_bunbury = 0

  const [Metro_North, Metro_South, Albany, Margaret_River, Bunbury] = await Promise.all([
    axios.get(
      'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=25',
    ),
    axios.get(
      'https://corsproxy.io/?https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=26',
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
  const metro_north_xml_parser = fuel_data_parser(Metro_North.data)
  const metro_south_xml_parser = fuel_data_parser(Metro_North.data)
  const albany_xml_parser = fuel_data_parser(Albany.data)
  const margaret_river_xml_parser = fuel_data_parser(Margaret_River.data)
  const bunbury_xml_parser = fuel_data_parser(Bunbury.data)

  for (let i = 0; i < metro_north_xml_parser.length; i++) {
    total_metro_north += Number(metro_north_xml_parser[i].price)
  }
  for (let i = 0; i < metro_south_xml_parser.length; i++) {
    total_metro_south += Number(metro_south_xml_parser[i].price)
  }
  for (let i = 0; i < albany_xml_parser.length; i++) {
    total_albany += Number(albany_xml_parser[i].price)
  }
  for (let i = 0; i < margaret_river_xml_parser.length; i++) {
    total_margaret_river += Number(margaret_river_xml_parser[i].price)
  }
  for (let i = 0; i < bunbury_xml_parser.length; i++) {
    total_bunbury += Number(bunbury_xml_parser[i].price)
  }
  return [
    parseFloat((total_metro_north / metro_north_xml_parser.length / 100).toFixed(2)),
    parseFloat((total_metro_south / metro_south_xml_parser.length / 100).toFixed(2)),
    parseFloat((total_margaret_river / margaret_river_xml_parser.length / 100).toFixed(2)),
    parseFloat((total_albany / albany_xml_parser.length / 100).toFixed(2)),
    parseFloat((total_bunbury / bunbury_xml_parser.length / 100).toFixed(2)),
  ]
}
