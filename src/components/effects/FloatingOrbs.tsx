interface Props {
  variant?: 'green' | 'mixed' | 'gold';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export default function FloatingOrbs({ variant = 'green', intensity = 'medium' }: Props) {
  const opacity = intensity === 'subtle' ? 0.15 : intensity === 'medium' ? 0.28 : 0.45;

  const palette = {
    green: ['#F2C53D', '#C49B25', '#3A2A00'],
    mixed: ['#F2C53D', '#7AB8FF', '#FF6B7E'],
    gold:  ['#FFD23B', '#F2C53D', '#FF8C00'],
  }[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Orb 1 - top right */}
      <div
        className="orb-1 absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full blur-[100px]"
        style={{ background: palette[0], opacity }}
      />
      {/* Orb 2 - mid left */}
      <div
        className="orb-2 absolute top-[40%] -left-40 w-[360px] h-[360px] rounded-full blur-[90px]"
        style={{ background: palette[1], opacity: opacity * 0.7 }}
      />
      {/* Orb 3 - bottom */}
      <div
        className="orb-3 absolute -bottom-32 left-[35%] w-[300px] h-[300px] rounded-full blur-[80px]"
        style={{ background: palette[2], opacity: opacity * 0.5 }}
      />
    </div>
  );
}
