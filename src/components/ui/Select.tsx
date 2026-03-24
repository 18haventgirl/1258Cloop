import { forwardRef, SelectHTMLAttributes } from 'react';

const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => {
  return (
    <select
      {...props}
      ref={ref}
      className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 ${
        props.className ?? ''
      }`}
    />
  );
});

Select.displayName = 'Select';

export default Select;
