import Card from '../ui/Card';

const WeeklyScheduleCard = () => {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">每周安排说明</h2>
      <ul className="mt-4 space-y-2 text-sm text-slate-600">
        <li>每周 2 高碳 + 3 中碳 + 2 低碳。</li>
        <li>高碳日适合训练强度较高或活动量较大的日子。</li>
        <li>中碳日适合普通活动日。</li>
        <li>低碳日适合休息或低活动日。</li>
      </ul>
    </Card>
  );
};

export default WeeklyScheduleCard;
