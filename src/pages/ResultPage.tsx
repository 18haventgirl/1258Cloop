import { Link, useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { usePlanStore } from '../store/usePlanStore';
import DisclaimerNotice from '../components/result/DisclaimerNotice';
import SummaryCards from '../components/result/SummaryCards';
import CarbDayCard from '../components/result/CarbDayCard';
import WeeklyScheduleCard from '../components/result/WeeklyScheduleCard';
import ProteinTipsCard from '../components/result/ProteinTipsCard';
import AdjustmentTipsCard from '../components/result/AdjustmentTipsCard';
import FoodExchangeCard from '../components/result/FoodExchangeCard';
import CaloriesBarChart from '../components/charts/CaloriesBarChart';
import MacrosCompareChart from '../components/charts/MacrosCompareChart';
import { copyText } from '../lib/utils/clipboard';
import { downloadJson } from '../lib/utils/export';
import { generateFoodExchangeExamples } from '../lib/calculators/foodExchange';
import { formatNumber } from '../lib/utils/format';
import { useSeo } from '../hooks/useSeo';
import { siteConfig } from '../config/site';

const ResultPage = () => {
  const navigate = useNavigate();
  const { result } = usePlanStore();

  useSeo(siteConfig.pages.result);

  if (!result) {
    return (
      <PageContainer>
        <div className="py-12">
          <EmptyState
            title="还没有生成计划"
            description="请先填写个人信息并生成碳循环计划。"
            action={
              <Button type="button" onClick={() => navigate('/calculator')}>
                去填写信息
              </Button>
            }
          />
        </div>
      </PageContainer>
    );
  }

  const highFood = generateFoodExchangeExamples(result.highDay.carbs);
  const lowFood = generateFoodExchangeExamples(result.lowDay.carbs);

  const handleCopy = async () => {
    const summary = [
      `BMR: ${formatNumber(result.bmr)} kcal`,
      `TDEE: ${formatNumber(result.tdee)} kcal`,
      `高碳日: 碳水 ${formatNumber(result.highDay.carbs)} g, 蛋白质 ${formatNumber(
        result.highDay.protein
      )} g, 脂肪 ${formatNumber(result.highDay.fat)} g, 热量 ${formatNumber(
        result.highDay.calories
      )} kcal`,
      `中碳日: 碳水 ${formatNumber(result.mediumDay.carbs)} g, 蛋白质 ${formatNumber(
        result.mediumDay.protein
      )} g, 脂肪 ${formatNumber(result.mediumDay.fat)} g, 热量 ${formatNumber(
        result.mediumDay.calories
      )} kcal`,
      `低碳日: 碳水 ${formatNumber(result.lowDay.carbs)} g, 蛋白质 ${formatNumber(
        result.lowDay.protein
      )} g, 脂肪 ${formatNumber(result.lowDay.fat)} g, 热量 ${formatNumber(
        result.lowDay.calories
      )} kcal`,
      '每周安排：2 高碳 + 3 中碳 + 2 低碳',
      '说明：碳水与脂肪反向波动，蛋白质保持固定。'
    ].join('\n');

    await copyText(summary);
    alert('已复制到剪贴板');
  };

  const handleExport = () => {
    downloadJson(result, 'carb-cycle-plan.json');
  };

  return (
    <PageContainer>
      <div className="py-12 space-y-6">
        <div className="section-card p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-slate-900">你的碳循环减脂计划</h1>
          <p className="mt-2 text-sm text-slate-600">
            这是一个起始模板，后续应根据体重、围度、饥饿感和恢复状态调整。
          </p>
        </div>

        <DisclaimerNotice />

        <SummaryCards result={result} />

        <div className="grid gap-4 lg:grid-cols-3">
          <CarbDayCard
            title="高碳日"
            description="适合训练强度较高的日子"
            data={result.highDay}
          />
          <CarbDayCard
            title="中碳日"
            description="适合普通活动日"
            data={result.mediumDay}
          />
          <CarbDayCard
            title="低碳日"
            description="适合休息或低活动日"
            data={result.lowDay}
          />
        </div>

        <WeeklyScheduleCard />

        <div className="grid gap-6 lg:grid-cols-2">
          <CaloriesBarChart result={result} />
          <MacrosCompareChart result={result} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <FoodExchangeCard title="高碳日食物换算示例" carbGrams={result.highDay.carbs} examples={highFood} />
          <FoodExchangeCard title="低碳日食物换算示例" carbGrams={result.lowDay.carbs} examples={lowFood} />
        </div>

        <ProteinTipsCard />
        <AdjustmentTipsCard />

        <div className="flex flex-wrap gap-4 no-print">
          <Link to="/calculator">
            <Button variant="secondary">返回修改</Button>
          </Link>
          <Button type="button" onClick={handleCopy}>
            一键复制结果
          </Button>
          <Button type="button" variant="secondary" onClick={handleExport}>
            导出 JSON
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default ResultPage;
