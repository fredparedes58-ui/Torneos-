interface Props {
  seed: number;
  size?: number;
  ring?: 'lime' | 'gold' | 'red' | 'blue' | 'none';
  className?: string;
}

const ringColors = {
  lime: '#D4FF1F',
  gold: '#FFD23B',
  red:  '#FF6B7E',
  blue: '#7AB8FF',
  none: 'transparent',
};

/**
 * Avatar component using pravatar (consistent placeholder faces by seed).
 * Falls back to gradient if image fails to load.
 */
export default function Avatar({ seed, size = 40, ring = 'none', className = '' }: Props) {
  const url = `https://i.pravatar.cc/${size * 2}?img=${seed}`;
  const ringColor = ringColors[ring];
  return (
    <div
      className={`rounded-full overflow-hidden shrink-0 ${className}`}
      style={{
        width: size, height: size,
        boxShadow: ring !== 'none' ? `0 0 0 2px ${ringColor}, 0 0 12px ${ringColor}50` : undefined,
        background: 'linear-gradient(135deg, #282C1D 0%, #1A2010 100%)',
      }}
    >
      <img
        src={url}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
}
