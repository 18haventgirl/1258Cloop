import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { useSeo } from '../hooks/useSeo';
import { siteConfig } from '../config/site';

const HomePage = () => {
  useSeo(siteConfig.pages.home);

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
    </div>
  );
};

export default HomePage;
