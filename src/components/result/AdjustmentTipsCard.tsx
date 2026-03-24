import Card from '../ui/Card';

const AdjustmentTipsCard = () => {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">调整建议</h2>
      <p className="mt-3 text-sm text-slate-600">
        这是减脂起始模板，后续应结合以下反馈进行微调：
      </p>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li>体重变化</li>
        <li>腰围变化</li>
        <li>主观饥饿感</li>
        <li>训练状态</li>
        <li>恢复状态</li>
      </ul>
    </Card>
  );
};

export default AdjustmentTipsCard;
