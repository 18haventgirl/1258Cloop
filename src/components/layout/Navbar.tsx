import { Link, NavLink } from 'react-router-dom';
import PageContainer from './PageContainer';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <PageContainer>
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-base font-semibold tracking-tight text-slate-900">
            <img src="/logo.svg" alt="1258" className="h-8 w-8" />
            1258碳循环计算器
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <NavLink to="/calculator" className="hover:text-slate-900">
              计算器
            </NavLink>
            <NavLink to="/result" className="hover:text-slate-900">
              结果页
            </NavLink>
            <NavLink to="/disclaimer" className="hover:text-slate-900">
              免责声明
            </NavLink>
          </nav>
        </div>
      </PageContainer>
    </header>
  );
};

export default Navbar;
