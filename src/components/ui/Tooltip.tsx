import { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps) => {
  return (
    <span className="group relative inline-flex items-center">
      <span className="cursor-help text-xs text-slate-500 underline decoration-dotted" title={content}>
        {children}
      </span>
    </span>
  );
};

export default Tooltip;
