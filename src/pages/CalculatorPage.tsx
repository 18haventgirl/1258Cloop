import PageContainer from '../components/layout/PageContainer';
import CalculatorForm from '../components/form/CalculatorForm';
import Card from '../components/ui/Card';
import { useSeo } from '../hooks/useSeo';
import { siteConfig } from '../config/site';

const CalculatorPage = () => {
  useSeo(siteConfig.pages.calculator);

  return (
    <PageContainer>
      <div className="py-12 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">碳循环计算器</h1>
          <p className="mt-2 text-sm text-slate-600">
            填写基本信息后生成高碳/中碳/低碳日计划。目标固定为减脂。
          </p>
        </div>

        <CalculatorForm />

        <Card className="p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">计算公式公示</h2>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">BMR（Mifflin-St Jeor）</h3>
              <p>男：10 × 体重(kg) + 6.25 × 身高(cm) - 5 × 年龄 + 5</p>
              <p>女：10 × 体重(kg) + 6.25 × 身高(cm) - 5 × 年龄 - 161</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">TDEE</h3>
              <p>TDEE = BMR × 活动系数</p>
              <p>久坐 1.2｜轻度 1.375｜中度 1.55｜高度 1.725｜极高 1.9</p>
              <p>
                参考说明：
                久坐（几乎不运动或主要为久坐工作），
                轻度（每周约 1~3 次训练/运动），
                中度（每周约 3~5 次训练/运动），
                高度（几乎每天训练或体力劳动较多），
                极高（高强度训练且伴随高体力工作）。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">每日基础碳水</h3>
              <p>内胚型 2.0 g/kg｜中胚型 2.5 g/kg｜外胚型 3.0 g/kg</p>
              <p>dailyCarbsBase = 体重 × 对应系数</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">每日基础脂肪</h3>
              <p>dailyFatBase = 体重 × 你选择的脂肪系数（g/kg）</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">每日固定蛋白质</h3>
              <p>无基础 0.8 g/kg｜新手 1.0 g/kg｜中级 1.2 g/kg｜高级 1.5 g/kg</p>
              <p>dailyProtein = 体重 × 对应系数</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">周分配与日分配</h3>
              <p>每周 2 高碳 + 3 中碳 + 2 低碳</p>
              <p>周碳水：高 50%｜中 35%｜低 15%</p>
              <p>周脂肪：高 15%｜中 35%｜低 50%</p>
              <p>高碳日碳水 = 周碳水 × 0.5 ÷ 2</p>
              <p>中碳日碳水 = 周碳水 × 0.35 ÷ 3</p>
              <p>低碳日碳水 = 周碳水 × 0.15 ÷ 2</p>
              <p>高碳日脂肪 = 周脂肪 × 0.15 ÷ 2</p>
              <p>中碳日脂肪 = 周脂肪 × 0.35 ÷ 3</p>
              <p>低碳日脂肪 = 周脂肪 × 0.5 ÷ 2</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">热量换算</h3>
              <p>热量 = 碳水 × 4 + 蛋白质 × 4 + 脂肪 × 9</p>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CalculatorPage;
