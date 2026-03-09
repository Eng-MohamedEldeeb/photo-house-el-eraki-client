export default function Spinner({ fullScreen }: { fullScreen?: boolean }) {
  const spinner = (
    <div
      className="w-10 h-10 border-2 border-dark3 border-t-gold
      rounded-full animate-spin"
    />
  );
  if (fullScreen)
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  return <div className="flex justify-center py-12">{spinner}</div>;
}
