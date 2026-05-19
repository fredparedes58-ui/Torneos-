interface Props {
  count?: number;
  color?: string;
}

/**
 * Renders absolutely-positioned sparkle dots within a relative parent.
 * Each sparkle twinkles with a different delay for organic feel.
 */
export default function Sparkles({ count = 6, color = '#D4FF1F' }: Props) {
  // deterministic seed-based positions so layout is stable
  const positions = Array.from({ length: count }).map((_, i) => {
    const seed = i * 137.5;
    return {
      top:   `${(seed * 1.7) % 92}%`,
      left:  `${(seed * 2.3) % 95}%`,
      delay: (i * 0.3) % 2.2,
      size:  2 + (i % 3) * 2,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {positions.map((p, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            top: p.top, left: p.left,
            width: p.size, height: p.size,
            background: color,
            boxShadow: `0 0 ${p.size * 3}px ${color}, 0 0 ${p.size * 6}px ${color}40`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
