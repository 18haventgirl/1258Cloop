import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useSeo } from '../hooks/useSeo';
import { siteConfig } from '../config/site';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const foodData = [
  {
    name: '熟鸡蛋全蛋',
    unit: '1个（大）',
    calories: 77.5,
    protein: 6.29,
    fat: 5.3,
    carbs: 0.56,
    source: 'USDA（University Hospitals）',
    sourceUrl: 'https://www.uhhospitals.org/health-information/health-and-wellness-library/article/nutritionfacts-v1/egg-whole-cooked-hard-boiled-1-large'
  },
  {
    name: '蛋清',
    unit: '1个（大）',
    calories: 17.16,
    protein: 3.6,
    fat: 0.06,
    carbs: 0.24,
    source: 'USDA（University Hospitals）',
    sourceUrl: 'https://www.uhhospitals.org/health-information/health-and-wellness-library/article/nutritionfacts-v1/egg-white-raw-fresh-1-large'
  },
  {
    name: '生大米（白米，长粒）',
    unit: '1 cup（生，185g）',
    calories: 675,
    protein: 13.2,
    fat: 1.2,
    carbs: 147.9,
    source: 'USDA（MyFoodData）',
    sourceUrl: 'https://tools.myfooddata.com/nutrition-facts/169756/wt1'
  },
  {
    name: '熟米饭（白米，长粒）',
    unit: '100g（熟）',
    calories: 130,
    protein: 2.7,
    fat: 0.28,
    carbs: 28.2,
    source: 'USDA（MyFoodData）',
    sourceUrl: 'https://tools.myfooddata.com/nutrition-facts/20445'
  },
  {
    name: '生面条（干意面口径）',
    unit: '100g（干）',
    calories: 371,
    protein: 13,
    fat: 1.5,
    carbs: 74.7,
    source: 'USDA（MyFoodData）',
    sourceUrl: 'https://tools.myfooddata.com/nutrition-comparison/169736/100g'
  },
  {
    name: '熟面条（熟意面口径）',
    unit: '100g（熟）',
    calories: 158,
    protein: 5.8,
    fat: 0.93,
    carbs: 30.9,
    source: 'USDA（MyFoodData）',
    sourceUrl: 'https://tools.myfooddata.com/nutrition-facts/20121/100g/1'
  },
  {
    name: '馒头（蒸馒头）',
    unit: '100g',
    calories: 268,
    protein: 6.7,
    fat: 2.9,
    carbs: 54.3,
    source: 'USDA（FoodData Central，SnapCalorie 展示）',
    sourceUrl: 'https://www.snapcalorie.com/nutrition/steamed_bun_nutrition.html'
  },
  {
    name: '生鸡胸肉（去皮去骨）',
    unit: '100g',
    calories: 110,
    protein: 23.09,
    fat: 1.24,
    carbs: 0,
    source: 'USDA（SR 数据展示）',
    sourceUrl: 'https://www.cooks.com/rec/nutrition?nwal=05062'
  },
  {
    name: '熟鸡胸肉（烤，去皮）',
    unit: '100g',
    calories: 165,
    protein: 31.02,
    fat: 3.57,
    carbs: 0,
    source: 'USDA（SR 数据展示）',
    sourceUrl: 'https://www.cooks.com/rec/nutrition?nwal=05064'
  },
  {
    name: '熟鸡腿肉（去皮）',
    unit: '100g',
    calories: 209,
    protein: 25.94,
    fat: 10.88,
    carbs: 0,
    source: 'USDA（SR 数据展示）',
    sourceUrl: 'https://www.cooks.com/rec/nutrition?nwal=05098'
  }
];

const HomePage = () => {
  useSeo(siteConfig.pages.home);

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    const keyword = query.trim();
    if (!keyword) return foodData;
    return foodData.filter((item) => item.name.includes(keyword));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 py-16 text-white">
        <PageContainer>
          <div className="flex flex-col gap-8">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-300">1258工具站</p>
              <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                1258碳循环计算器
              </h1>
              <p className="mt-4 text-base text-slate-200">
                在线生成高碳、低碳、中碳减脂计划，自动计算基础代谢、TDEE 与三大营养素分配。
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/calculator" className="btn-primary">
                  立即生成计划
                </Link>
                <Link to="/disclaimer" className="btn-secondary text-white">
                  查看免责声明
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'BMR 计算', desc: '根据身高体重与年龄估算基础代谢。' },
                { title: 'TDEE 估算', desc: '结合活动水平估算每日消耗。' },
                { title: '碳循环计划生成', desc: '高、中、低碳日自动分配。' },
                { title: '三大营养素分配', desc: '碳水、脂肪、蛋白质一目了然。' }
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </PageContainer>
      </section>

      <section className="py-12">
        <PageContainer>
          <div className="section-card p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-slate-900">工具定位</h2>
            <p className="mt-3 text-sm text-slate-600">
              这是一个用于减脂阶段的碳循环起始模板生成器。计算逻辑优先，结构清晰，移动端友好。
              后续会支持完整计算、图表与导出功能。
            </p>
          </div>
        </PageContainer>
      </section>

      <section className="pb-16">
        <PageContainer>
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-slate-900">热量速查</h2>
              <div className="w-full sm:w-56">
                <Input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="搜索食物"
                />
              </div>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm text-slate-600">
                <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-2">食物</th>
                    <th className="py-2">常用单位</th>
                    <th className="py-2">热量</th>
                    <th className="py-2">蛋白质</th>
                    <th className="py-2">脂肪</th>
                    <th className="py-2">碳水</th>
                    <th className="py-2">来源</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((item) => (
                    <tr key={item.name} className="border-b border-slate-100">
                      <td className="py-2 font-medium text-slate-900">{item.name}</td>
                      <td className="py-2">{item.unit}</td>
                      <td className="py-2">{item.calories} kcal</td>
                      <td className="py-2">{item.protein} g</td>
                      <td className="py-2">{item.fat} g</td>
                      <td className="py-2">{item.carbs} g</td>
                      <td className="py-2">
                        <a
                          href={item.sourceUrl}
                          className="text-brand-600 hover:text-brand-700"
                          target="_blank"
                          rel="noreferrer"
                        >
                          {item.source}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span>共 {filtered.length} 条</span>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPage(num)}
                    className={`h-8 w-8 rounded-full border text-xs ${
                      num === currentPage
                        ? 'border-brand-600 bg-brand-600 text-white'
                        : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-400">
                数据来自 USDA FoodData Central（通过 MyFoodData / University Hospitals / USDA SR 展示）。
              </span>
            </div>
          </Card>
        </PageContainer>
      </section>
    </div>
  );
};

export default HomePage;
