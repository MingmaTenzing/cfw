// this function compares yesterday's and today's price
// this provide a positive or a negative number as an
//indication to the increase or decrease %  in fuel price

import axios from 'axios'
import { fuel_data_parser } from './xml_fuel_data_parser'

export const change_and_prediction = async () => {
  const [yesterday_prices, today_prices] = await Promise.all([
    axios.get('https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Day=yesterday&Region=26'),
    axios.get('https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Day=today&Region=26'),
  ])

  const parse_xml_yesterday = fuel_data_parser(yesterday_prices.data)
  const parse_xml_today = fuel_data_parser(today_prices.data)

  const today_average =
    parse_xml_today.reduce((sum, price) => sum + price.price, 0) / parse_xml_today.length
  const yesterday_average =
    parse_xml_today.reduce((sum, price) => sum + price.price, 0) / parse_xml_yesterday.length

  console.log('average for today and yesterda', today_average, yesterday_average)

  // calculating percentage change
  const percentage_change = ((today_average - yesterday_average) / yesterday_average) * 100

  // predecting tomorrow's price

  const tomorrow_prediction = today_average * (1 + percentage_change / 100)

  return {
    percentage_change: percentage_change,
    tomorrow_prediction_price: tomorrow_prediction,
  }
}
