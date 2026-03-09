export default function TableRowSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr
          key={i}
          className={i % 2 === 0 ? "bg-dark2" : "bg-dark"}
          aria-hidden
        >
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div
                className="h-4 bg-dark3 rounded animate-pulse
                w-full"
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
