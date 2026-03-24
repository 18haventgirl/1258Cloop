import PageContainer from '../components/layout/PageContainer';
import { useSeo } from '../hooks/useSeo';
import { siteConfig } from '../config/site';

const DisclaimerPage = () => {
  useSeo(siteConfig.pages.disclaimer);

  return (
    <PageContainer>
      <div className="py-12">
        <div className="section-card p-6 sm:p-8 space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">免责声明</h1>
          <p className="text-sm text-slate-600">
            本工具仅供健身饮食规划参考，不构成医学建议或诊断治疗方案。
          </p>
          <p className="text-sm text-slate-600">
            如有慢性病、肾病、糖尿病、孕期、哺乳期、进食障碍或其他特殊健康情况，请咨询医生或专业营养师。
          </p>
          <p className="text-sm text-slate-600">
            碳循环、高蛋白、低碳等饮食方式不适合所有人长期直接照搬。
          </p>
          <p className="text-sm text-slate-600">
            使用本工具所生成的计划应结合个人反馈与专业建议进行调整。
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default DisclaimerPage;
