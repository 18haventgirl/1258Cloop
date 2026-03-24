import Card from '../ui/Card';
import { PlanResult } from '../../types/result';
import { formatNumber } from '../../lib/utils/format';

interface SummaryCardsProps {
  result: PlanResult;
}

const SummaryCards = ({ result }: SummaryCardsProps) => {
  const items = [
    { label: 'BMR', value: `${formatNumber(result.bmr)} kcal` },
    { label: 'TDEE', value: `${formatNumber(result.tdee)} kcal` },
    { label: '每日基础碳水', value: `${formatNumber(result.dailyBaseCarbs)} g` },
    { label: '每日基础脂肪', value: `${formatNumber(result.dailyBaseFat)} g` },
    { label: '每日固定蛋白质', value: `${formatNumber(result.dailyProtein)} g` }
  ];

  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">基础代谢与消耗</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SummaryCards;
