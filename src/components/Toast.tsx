import { useEffect } from 'react';
import CheckIcon from '../assets/images/icon-success-check.svg';
import clsx from 'clsx';

interface ToastProps {
  heading: React.ReactNode;
  body: React.ReactNode;
  show: boolean;
  setShow: (show: boolean) => void;
  delay?: number;
}

export default function Toast({
  heading,
  body,
  show,
  setShow,
  delay = 5000,
}: ToastProps) {
  useEffect(() => {
    if (show) {
      setTimeout(() => setShow(false), delay);
    }
  }, [show, setShow, delay]);

  return (
    <div className="fixed inset-0 size-full flex justify-center items-start p-4 lg:p-6 pointer-events-none">
      <div
        className={clsx(
          'bg-grey-900 tracking-normal text-white flex flex-col gap-2 p-6 rounded-xl transition duration-500',
          show ? 'translate-y-0 opacity-1000' : '-translate-y-40 opacity-0'
        )}
      >
        <div className="flex items-center gap-2">
          <img src={CheckIcon} alt="" />
          <h3 className="text-lg font-bold">{heading}</h3>
        </div>
        <p className="text-green-200 text-wrap">{body}</p>
      </div>
    </div>
  );
}
