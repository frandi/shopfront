export function DiscountBadge({ percent }: { percent: number }) {
  return <span className="badge">{percent}% OFF</span>;
}
