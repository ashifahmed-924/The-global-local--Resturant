export default function ScallopEdge({ position = 'bottom', color = 'var(--bg-soft)' }) {
  return (
    <div
      className={`scallop scallop--${position}`}
      style={{ '--scallop-color': color }}
      aria-hidden="true"
    />
  );
}
