import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import Card from '../ui/Card';
import { PlanResult } from '../../types/result';
import { formatNumber } from '../../lib/utils/format';

interface MacrosCompareChartProps {
  result: PlanResult;
}

const MacrosCompareChart = ({ result }: MacrosCompareChartProps) => {
  const data = [
    {
      name: '高碳日',
      carbs: result.highDay.carbs,
      protein: result.highDay.protein,
      fat: result.highDay.fat
    },
    {
      name: '中碳日',
      carbs: result.mediumDay.carbs,
      protein: result.mediumDay.protein,
      fat: result.mediumDay.fat
    },
    {
      name: '低碳日',
      carbs: result.lowDay.carbs,
      protein: result.lowDay.protein,
      fat: result.lowDay.fat
    }
  ];

  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">三大营养素对比</h2>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => formatNumber(value)} />
            <Tooltip formatter={(value) => `${formatNumber(Number(value))} g`} />
            <Legend />
            <Bar dataKey="carbs" name="碳水" fill="#38bdf8" radius={[8, 8, 0, 0]} />
            <Bar dataKey="protein" name="蛋白质" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="fat" name="脂肪" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MacrosCompareChart;
