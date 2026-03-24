import Card from '../ui/Card';
import { MacroDay } from '../../types/result';
import { formatNumber } from '../../lib/utils/format';

interface CarbDayCardProps {
  title: string;
  description?: string;
  data: MacroDay;
}

const CarbDayCard = ({ title, description, data }: CarbDayCardProps) => {
  return (
    <Card className="p-5 sm:p-6">
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      {description && <p className="mt-1 text-xs text-slate-500">{description}</p>}
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>碳水：{formatNumber(data.carbs)} g</p>
        <p>蛋白质：{formatNumber(data.protein)} g</p>
        <p>脂肪：{formatNumber(data.fat)} g</p>
        <p className="pt-2 text-base font-semibold text-slate-900">热量：{formatNumber(data.calories)} kcal</p>
      </div>
    </Card>
  );
};

export default CarbDayCard;
