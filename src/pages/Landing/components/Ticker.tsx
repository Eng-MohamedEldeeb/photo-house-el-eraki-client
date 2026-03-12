const items = [
  "Premium Quality",
  "Fast Delivery",
  "Photography Supplies",
  "Frames & Albums",
];

export default function Ticker() {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="bg-yellow-400 py-2.5 overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-ui text-dark font-semibold
            text-xs tracking-widest mx-8 uppercase"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
