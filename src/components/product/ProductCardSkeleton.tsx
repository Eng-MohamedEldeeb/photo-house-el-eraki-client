export default function ProductCardSkeleton() {
  return (
    <div
      className="bg-dark2 border border-dark3 rounded overflow-hidden
      animate-pulse"
    >
      {/* Image placeholder */}
      <div className="aspect-square bg-dark3" />
      {/* Info placeholder */}
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 bg-dark3 rounded w-3/4" />
        <div className="h-3 bg-dark3 rounded w-1/2" />
        <div
          className="flex items-center justify-between pt-2
          border-t border-dark3/50"
        >
          <div className="h-4 bg-dark3 rounded w-16" />
          <div className="h-5 bg-dark3 rounded w-20" />
        </div>
      </div>
    </div>
  );
}
