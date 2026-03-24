import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import Card from '../ui/Card';
import { PlanResult } from '../../types/result';
import { formatNumber } from '../../lib/utils/format';

interface CaloriesBarChartProps {
  result: PlanResult;
}

const CaloriesBarChart = ({ result }: CaloriesBarChartProps) => {
  const data = [
    { name: '高碳日', calories: result.highDay.calories },
    { name: '中碳日', calories: result.mediumDay.calories },
    { name: '低碳日', calories: result.lowDay.calories }
  ];

  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">每日热量对比</h2>
      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => formatNumber(value)} />
            <Tooltip formatter={(value) => `${formatNumber(Number(value))} kcal`} />
            <Bar dataKey="calories" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default CaloriesBarChart;
