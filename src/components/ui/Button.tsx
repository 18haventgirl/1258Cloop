import { ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ type = 'button', variant = 'primary', disabled, children, onClick }: ButtonProps) => {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-600 disabled:bg-slate-300'
      : 'border border-slate-300 text-slate-700 hover:border-slate-400 focus:ring-slate-400 disabled:text-slate-400';

  return (
    <button type={type} className={`${base} ${styles}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
