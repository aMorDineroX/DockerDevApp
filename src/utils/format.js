export const formatNumber = (num, decimals = 2) => {
  if (!num && num !== 0) return '--'
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

export const formatPrice = (price) => {
  return `$${formatNumber(price)}`
}

export const formatPercentage = (value) => {
  return `${formatNumber(value)}%`
}

export const formatDate = (date) => {
  return new Date(date).toLocaleString()
}
