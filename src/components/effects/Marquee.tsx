import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  speed?: number; // seconds
  className?: string;
}

/**
 * Infinite horizontal marquee. Children get duplicated for seamless loop.
 */
export default function Marquee({ children, speed = 30, className = '' }: Props) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap"
           style={{ animationDuration: `${speed}s` }}>
        <div className="flex gap-12 shrink-0">{children}</div>
        <div className="flex gap-12 shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  );
}
