export const fuel_data_parser = (data: Element[]) => {
  return data.map((item) => ({
    title: item.getElementsByTagName('title')[0]?.textContent || 'N/A',
    description: item.getElementsByTagName('description')[0]?.textContent || 'N/A',
    date: item.getElementsByTagName('date')[0]?.textContent || 'N/A',
    trading_name: item.getElementsByTagName('trading-name')[0]?.textContent || 'N/A',
    price: item.getElementsByTagName('price')[0]?.textContent || 'N/A',
    location: item.getElementsByTagName('location')[0]?.textContent || 'N/A',
    address: item.getElementsByTagName('address')[0]?.textContent || 'N/A',
    latitude: parseFloat(item.getElementsByTagName('latitude')[0]?.textContent || 'N/A'),
    longitude: parseFloat(item.getElementsByTagName('longitude')[0]?.textContent || 'N/A'),
    site_features: item.getElementsByTagName('site-features')[0]?.textContent || 'N/A',
    phone: item.getElementsByTagName('phone')[0]?.textContent || 'N/A',
    brand: item.getElementsByTagName('brand')[0]?.textContent || 'N/A',
    brand_image: `https://www.fuelwatch.wa.gov.au/assets/images/logo_${item.getElementsByTagName('brand')[0]?.textContent}.svg`,
  }))
}
