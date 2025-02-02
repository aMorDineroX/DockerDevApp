import { 
  BarChart2, 
  LineChart,
  CandlesChart
} from 'lucide-vue-next'

// Rename CandlesChart to CandlestickIcon for consistency
export const CandlestickIcon = CandlesChart
export const LineChartIcon = LineChart
export const ChartIcon = BarChart2

export const iconMap = {
  CandlestickIcon: CandlesChart,
  LineChartIcon: LineChart,
  ChartIcon: BarChart2
}