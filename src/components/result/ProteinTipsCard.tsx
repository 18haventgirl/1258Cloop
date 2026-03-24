import Card from '../ui/Card';

const ProteinTipsCard = () => {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">蛋白质摄入提示</h2>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li>蛋白质建议分餐摄入。</li>
        <li>建议每日分 3~5 餐。</li>
        <li>单次蛋白质建议 20g~40g。</li>
        <li>尽量不要长时间完全没有蛋白质摄入。</li>
      </ul>
    </Card>
  );
};

export default ProteinTipsCard;
