import { useEffect, useState, useRef } from 'react';

interface Props {
  to: number;
  duration?: number;   // ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
}

export default function CounterUp({
  to, duration = 1400, prefix = '', suffix = '',
  decimals = 0, separator = ',', className,
}: Props) {
  const [value, setValue] = useState(0);
  const startTime = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = null;
    if (raf.current) cancelAnimationFrame(raf.current);

    const step = (ts: number) => {
      if (startTime.current === null) startTime.current = ts;
      const elapsed = ts - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(to * eased);
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [to, duration]);

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  }).replace(/,/g, separator);

  return <span className={className}>{prefix}{formatted}{suffix}</span>;
}
