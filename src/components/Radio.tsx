import clsx from 'clsx';

interface RadioProps {
  label: React.ReactNode;
  name: string;
  value: string;
  checked: boolean;
  handleChange: (field: 'query', value: string) => void;
}

export default function Radio({
  label,
  name,
  value,
  checked,
  handleChange,
}: RadioProps) {
  return (
    <label
      className={clsx(
        'flex items-center gap-4 cursor-pointer',
        'border border-grey-500 hover:border-green-600 rounded-lg px-6 h-[51px]',
        checked
          ? 'bg-green-200 border-green-600'
          : 'focus-within:border-green-600 focus-within:bg-green-200'
      )}
    >
      <input
        name={name}
        value={value}
        type="radio"
        checked={checked}
        onChange={(e) => handleChange('query', e.target.value)}
        className="absolute opacity-0"
      />
      <div
        className={clsx(
          'size-[10px] rounded-full outline outline-offset-[3px] transition',
          checked
            ? 'bg-green-600 outline-green-600 outline-2'
            : 'outline-grey-500/30 outline-2'
        )}
      />
      <span className="text-lg whitespace-nowrap">{label}</span>
    </label>
  );
}
