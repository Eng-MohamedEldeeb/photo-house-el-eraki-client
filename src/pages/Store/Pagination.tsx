import { useSearchParams } from "react-router-dom";

export default function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  const [, setParams] = useSearchParams();

  if (totalPages <= 1) return null;

  const goTo = (p: number) =>
    setParams((prev) => {
      const n = new URLSearchParams(prev);
      n.set("page", String(p));
      return n;
    });

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="font-ui text-xs px-3 py-2 border border-dark3
          text-text3 hover:border-gold/50 disabled:opacity-30 rounded"
      >
        ← Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={`font-ui text-xs w-8 h-8 rounded border transition-colors
            ${
              p === currentPage
                ? "bg-gold text-dark border-gold font-bold"
                : "border-dark3 text-text3 hover:border-gold/50"
            }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="font-ui text-xs px-3 py-2 border border-dark3
          text-text3 hover:border-gold/50 disabled:opacity-30 rounded"
      >
        Next →
      </button>
    </div>
  );
}
