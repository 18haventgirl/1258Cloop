import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { useSeo } from '../hooks/useSeo';
import { siteConfig } from '../config/site';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const toKcal = (kj: number) => Math.round((kj / 4.184) * 10) / 10;

const foodData = [
  {
    name: '鸡蛋（全蛋，均值）',
    unit: '100g',
    energyKj: 599,
    protein: 13.3,
    fat: 8.8,
    carbs: 2.8,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/978.html'
  },
  {
    name: '鸡蛋白',
    unit: '100g',
    energyKj: 254,
    protein: 11.6,
    fat: 0.1,
    carbs: 3.1,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/982.html'
  },
  {
    name: '稻米（生，均值）',
    unit: '100g',
    energyKj: 1473,
    protein: 7.4,
    fat: 0.8,
    carbs: 77.9,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/280.html'
  },
  {
    name: '米饭（蒸，均值）',
    unit: '100g',
    energyKj: 493,
    protein: 2.6,
    fat: 0.3,
    carbs: 25.9,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/287.html'
  },
  {
    name: '挂面（干，均值）',
    unit: '100g',
    energyKj: 1476,
    protein: 10.3,
    fat: 0.6,
    carbs: 75.6,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/261.html'
  },
  {
    name: '面条（均值）',
    unit: '100g',
    energyKj: 1212,
    protein: 8.3,
    fat: 0.7,
    carbs: 61.9,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/264.html'
  },
  {
    name: '馒头（均值）',
    unit: '100g',
    energyKj: 947,
    protein: 7.0,
    fat: 1.1,
    carbs: 47.0,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/272.html'
  },
  {
    name: '鸡胸脯肉（生）',
    unit: '100g',
    energyKj: 557,
    protein: 19.4,
    fat: 5.0,
    carbs: 2.5,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/880.html'
  },
  {
    name: '鸡胸肉（熟，炖/焖）',
    unit: '100g',
    energyKj: 695,
    protein: 32.1,
    fat: 3.24,
    carbs: 0,
    source: 'USDA FoodData Central（Health Science Insights）',
    sourceUrl:
      'https://www.healthscienceinsights.com/en/tools/nutrition-facts/products/331960-chicken-broiler-or-fryers-breast-skinless-boneless-meat-only-cooked-braised/'
  },
  {
    name: '卤鸡腿（参考：鸡小腿/腿棒，熟，braised）',
    unit: '100g',
    energyKj: 619,
    protein: 23.71,
    fat: 5.9,
    carbs: 0,
    source: 'USDA FNDDS Survey（Health Science Insights）',
    sourceUrl:
      'https://www.healthscienceinsights.com/en/tools/nutrition-facts/products/2706015-chicken-drumstick-stewed-skin-not-eaten/'
  },
  {
    name: '方便面饼（干）',
    unit: '100g',
    energyKj: 1983,
    protein: 9.5,
    fat: 21.1,
    carbs: 61.6,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/1291.html'
  },
  {
    name: '苹果（均值）',
    unit: '100g',
    energyKj: 229,
    protein: 0.2,
    fat: 0.2,
    carbs: 13.5,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/613.html'
  },
  {
    name: '香蕉',
    unit: '100g',
    energyKj: 394,
    protein: 1.4,
    fat: 0.2,
    carbs: 22.0,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/726.html'
  },
  {
    name: '橙',
    unit: '100g',
    energyKj: 204,
    protein: 0.8,
    fat: 0.2,
    carbs: 11.1,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/704.html'
  },
  {
    name: '番茄',
    unit: '100g',
    energyKj: 86,
    protein: 0.9,
    fat: 0.2,
    carbs: 4.0,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/405.html'
  },
  {
    name: '黄瓜（鲜）',
    unit: '100g',
    energyKj: 66,
    protein: 0.8,
    fat: 0.2,
    carbs: 2.9,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/422.html'
  },
  {
    name: '西兰花',
    unit: '100g',
    energyKj: 151,
    protein: 4.1,
    fat: 0.6,
    carbs: 4.3,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/465.html'
  },
  {
    name: '菠菜（鲜）',
    unit: '100g',
    energyKj: 116,
    protein: 2.6,
    fat: 0.3,
    carbs: 4.5,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/473.html'
  },
  {
    name: '胡萝卜（黄）',
    unit: '100g',
    energyKj: 193,
    protein: 1.4,
    fat: 0.2,
    carbs: 10.2,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/381.html'
  },
  {
    name: '马铃薯（土豆）',
    unit: '100g',
    energyKj: 328,
    protein: 2.0,
    fat: 0.2,
    carbs: 17.2,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/313.html'
  },
  {
    name: '甘薯（红心，红薯）',
    unit: '100g',
    energyKj: 432,
    protein: 1.1,
    fat: 0.2,
    carbs: 24.7,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/316.html'
  },
  {
    name: '大白菜（均值）',
    unit: '100g',
    energyKj: 76,
    protein: 1.5,
    fat: 0.1,
    carbs: 3.2,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/450.html'
  },
  {
    name: '葡萄（均值）',
    unit: '100g',
    energyKj: 187,
    protein: 0.5,
    fat: 0.2,
    carbs: 10.3,
    source: '中国食物成分表（CDC 营养与健康所）',
    sourceUrl: 'https://nlc.chinanutri.cn/fq/foodinfo/684.html'
  }
];

const HomePage = () => {
  useSeo(siteConfig.pages.home);

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    const keyword = query.trim();
    if (!keyword) return foodData;
    return foodData.filter((item) => item.name.includes(keyword));
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * pageSize, pageSize * currentPage);

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
              <h2 className="text-lg font-semibold text-slate-900">热量速查（100g 口径）</h2>
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
              <table className="w-full min-w-[640px] text-left text-sm text-slate-600">
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
                      <td className="py-2">{toKcal(item.energyKj)} kcal</td>
                      <td className="py-2">{item.protein.toFixed(1)} g</td>
                      <td className="py-2">{item.fat.toFixed(1)} g</td>
                      <td className="py-2">{item.carbs.toFixed(1)} g</td>
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
                数据主要来自中国食物成分表（中国疾病预防控制中心营养与健康所）。能量为 kJ 换算 kcal。
                鸡蛋通常以“个”计量，但权威成分表按 100g 口径，本表统一按 100g 展示。
                部分熟制禽肉来源为 USDA FoodData Central / FNDDS（通过 Health Science Insights 展示）。
                部分熟制食物实际含水量会变化，请以成品称重为准。
              </span>
            </div>
          </Card>
        </PageContainer>
      </section>
    </div>
  );
};

export default HomePage;
