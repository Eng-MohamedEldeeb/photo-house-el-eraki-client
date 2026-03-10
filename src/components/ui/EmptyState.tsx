interface Props {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick: () => void };
}
export default function EmptyState({ title, subtitle, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-full bg-dark2 border border-dark3
        flex items-center justify-center"
      >
        <span className="text-2xl text-text3"> </span>
      </div>
      <div className="text-center">
        <p className="font-ui text-text2 text-xl mb-1">{title}</p>
        {subtitle && <p className="font-ui text-text3 text-sm">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="font-ui text-sm text-yellow-400 hover:underline mt-2"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
