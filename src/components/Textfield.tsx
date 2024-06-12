import clsx from 'clsx';
import { FormData } from '../../types';

interface TextfieldProps {
  label: React.ReactNode;
  field: keyof Omit<FormData, 'errors'>;
  value: string;
  error?: string;
  handleChange: (field: keyof Omit<FormData, 'errors'>, value: string) => void;
  type?: HTMLInputElement['type'];
  required?: boolean;
  autoComplete?: HTMLInputElement['autocomplete'];
  className?: string;
}

export default function Textfield({
  label,
  field,
  value,
  error,
  handleChange,
  type = 'text',
  required = false,
  autoComplete,
  className,
}: TextfieldProps) {
  return (
    <label className={clsx('flex flex-col', className)}>
      <span className="flex">
        <span>{label}</span>
        {required && <span className="text-green-600 font-bold ml-2">*</span>}
      </span>
      <input
        type={type}
        autoComplete={autoComplete}
        onChange={(e) => handleChange(field, e.target.value)}
        value={value}
        maxLength={40}
        className={clsx(
          'border mt-2 rounded-lg w-full font-karla text-lg px-5 h-[51px] tracking-tight transition cursor-pointer',
          error ? 'border-red' : 'border-grey-500 hover:border-green-600'
        )}
      />
      {error && <span className="text-red mt-2">{error}</span>}
    </label>
  );
}
