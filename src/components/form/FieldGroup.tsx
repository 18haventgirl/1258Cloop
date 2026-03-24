import { ReactNode } from 'react';
import Tooltip from '../ui/Tooltip';

interface FieldGroupProps {
  label: string;
  hint?: string;
  tooltip?: string;
  error?: string;
  children: ReactNode;
}

const FieldGroup = ({ label, hint, tooltip, error, children }: FieldGroupProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-slate-900">{label}</span>
        {tooltip && <Tooltip content={tooltip}>说明</Tooltip>}
      </div>
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
      {children}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
};

export default FieldGroup;
