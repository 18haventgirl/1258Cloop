import PageContainer from './PageContainer';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <PageContainer>
        <div className="flex flex-col gap-2 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 1258碳循环计算器</span>
          <span>这是一个健身饮食工具站点，不构成医学建议。</span>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;

