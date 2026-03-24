import Card from '../ui/Card';

const DisclaimerNotice = () => {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">核心说明</h2>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li>这是一份用于减脂的碳循环起始模板。</li>
        <li>核心是让碳水与脂肪反向波动，同时尽量平衡总热量。</li>
        <li>后续应结合体重、腰围、饥饿感、训练状态与恢复情况微调。</li>
      </ul>
    </Card>
  );
};

export default DisclaimerNotice;
