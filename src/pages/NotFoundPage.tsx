import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

const NotFoundPage = () => {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 py-12 text-center">
        <h1 className="text-3xl font-semibold text-slate-900">页面未找到</h1>
        <p className="text-sm text-slate-600">你访问的页面不存在或已被移动。</p>
        <Link to="/" className="btn-primary">
          返回首页
        </Link>
      </div>
    </PageContainer>
  );
};

export default NotFoundPage;
