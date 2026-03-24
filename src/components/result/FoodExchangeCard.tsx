import Card from '../ui/Card';
import { FoodExchangeExamples } from '../../types/result';
import { formatNumber } from '../../lib/utils/format';

interface FoodExchangeCardProps {
  title: string;
  carbGrams: number;
  examples: FoodExchangeExamples;
}

const FoodExchangeCard = ({ title, carbGrams, examples }: FoodExchangeCardProps) => {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm text-slate-600">
        这里展示的是碳水含量换算示意，不是精确食谱。碳水克数不等于主食重量，实际请以食品包装或营养成分表为准。
      </p>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>该日碳水：{formatNumber(carbGrams)} g</p>
        <p>若主要来自米饭，约等于 {formatNumber(examples.riceGrams)} g 米饭</p>
        <p>若主要来自馒头，约等于 {formatNumber(examples.mantouGrams)} g 馒头</p>
        <p>若主要来自南瓜，约等于 {formatNumber(examples.pumpkinGrams)} g 南瓜</p>
      </div>
      <div className="mt-4 text-xs text-slate-500">
        100g 米饭 ≈ 25g 碳水，100g 馒头 ≈ 50g 碳水，100g 南瓜 ≈ 4.4g 碳水。
      </div>
    </Card>
  );
};

export default FoodExchangeCard;
